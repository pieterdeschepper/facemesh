let facemesh;
let video;
let predictions = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    facemesh = ml5.facemesh(video, modelReady);

    // This sets up an event that fills the global variable "predictions"
    // with an array every time new predictions are made
    facemesh.on("predict", results => {
        predictions = results;
    });

    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    // image(video, 0, 0, width, height);
    background(0,0,255);
    // We can call both functions to draw all keypoints
    stroke(0,255,0);
    drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const keypoints = predictions[i].scaledMesh;

        for (let j = 0; j < TRIANGULATION.length; j+=3) {
            const [x1, y1] = keypoints[TRIANGULATION[j]];
            const [x2, y2] = keypoints[TRIANGULATION[j+1]];
            const [x3, y3] = keypoints[TRIANGULATION[j+2]];
            line(x1,y1,x2,y2);
            line(x2,y2,x3,y3);
            line(x3,y3,x1,y1);
        }

        // Draw facial keypoints.
        // for (let j = 0; j < keypoints.length; j += 1) {
        //     const [x, y] = keypoints[j];
        //
        //     fill(0, 255, 0);
        //     ellipse(x, y, 5, 5);
        // }
    }
}