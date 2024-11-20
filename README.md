 # Blockchain-Proof-of-Work-Simulator-
 VISIT THE LINK " https://proof-of-work-simulator.netlify.app/ "
 The Blockchain Proof-of-Work Simulator is an educational tool that demonstrates the fundamental concepts of blockchain technology, including mining, proof-of-work, and network visualization. This simulator allows users to visualize the mining process, understand the relationship between difficulty and mining time, and explore the blockchain structure in an interactive, graphical format.

Features
Mining Simulation:

Simulates the mining process with adjustable difficulty levels (1-10).
Supports multiple miners with real-time visualization.
Displays metrics such as input data, nonce, hash rate, power consumption, and mining duration.
Blockchain Visualization:

Displays a dynamic blockchain structure.
Includes blocks with current and previous hash values.
Animations and color-coded statuses for better understanding.
Network Visualization:

Shows miners visually on a circular layout.
Real-time miner activity and animations during mining.
Progress Tracking:

Displays the mining progress using progress bars.
Tracks total attempts, hash rate, and elapsed time.
How to Use
Setup Mining Parameters:

Enter transaction data in the "Transaction Data" field.
Choose a difficulty level between 1 and 10 (higher values increase mining time).
Specify the number of miners (minimum 3, maximum 10).
Start Mining:

Click the Start Mining button.
The simulation begins, and miners start attempting to solve the proof-of-work.
Visualize the Network:

Observe miners on the circular layout with animations indicating activity.
Real-time updates on blockchain blocks and miner actions.
Stop Mining:

Use the Stop Mining button to halt the mining process.
Requirements
A modern web browser with JavaScript enabled.
Internet connection for loading external libraries (e.g., CryptoJS).
Installation
Clone the repository or download the source files.
Open the index.html file in a browser.
Files
index.html: Main HTML file containing the simulator interface.
style.css: Inline styles for layout and design.
JavaScript: Embedded in the HTML file for mining logic, animations, and blockchain simulation.
Dependencies
The simulator uses the following library:

CryptoJS: For hash computations.
Code Explanation
Key Functions
startMining(): Initiates the mining process by creating miners, visualizing the network, and simulating proof-of-work.
stopMining(): Stops the mining process and clears all animations.
visualizeMiners(numMiners): Dynamically places miners in a circular layout and assigns unique colors.
calculateMiningDuration(difficulty): Determines mining duration based on difficulty.
drawConnection(index1, index2, angleStep, radius): Draws connections between miners for network visualization.
Simulation Details
Miners try to find a valid hash by incrementing a nonce.
The mining process is visualized in real time with animations.
Blockchain blocks are updated once the mining is completed.
