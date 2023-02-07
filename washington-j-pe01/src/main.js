window.addEventListener("load", init);
window.addEventListener("load", () => { getWords(1)});

"use strict";

const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];

const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];

const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

// random number function
function getRandom(length) {
    return Math.floor(Math.random() * length)
}

function getWords(num) {
/*     let first = words1[getRandom(words1.length)];
    let second = words2[getRandom(words2.length)];
    let third = words3[getRandom(words3.length)]; */
    let output = document.querySelector("#output");
    let bigList = document.createElement("ul");

    output.innerHTML = "";

    // generating babbles
    for (let i = 0; i < num; i++){

        let li = document.createElement("li");
        li.innerText = `${words1[getRandom(words1.length)]}, ${words2[getRandom(words2.length)]}, ${words3[getRandom(words3.length)]}`;
        bigList.appendChild(li);
    }

    output.appendChild(bigList);

}

function init() {
    const button = document.querySelector("#my-button");
    const button2 = document.querySelector("#bigger-button");

    button.addEventListener("click", ()=>{getWords(1)});
    button2.addEventListener("click", ()=>{getWords(5)});
}