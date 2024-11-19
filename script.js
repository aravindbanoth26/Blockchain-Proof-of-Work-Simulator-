let mining = false;
        let difficulty = 4;
        let nonce = 0;
        let blockchain = [];
        let intervalId;
        let powerIntervalId;
        let startTime;
        let miningDuration;

        // Function to determine mining duration based on difficulty
        function calculateMiningDuration(difficulty) {
            if (difficulty >= 1 && difficulty <= 3) {
                return getRandomInt(1, 20);
            } else if (difficulty >= 4 && difficulty <= 7) {
                return getRandomInt(21, 40);
            } else if (difficulty >= 8 && difficulty <= 10) {
                return getRandomInt(41, 70);
            } else {
                throw new Error("Invalid difficulty level. Please provide a value between 1 and 10.");
            }
        }

        function startMining() {
            const numMiners = parseInt(document.getElementById('numMiners').value) || 6;
            difficulty = parseInt(document.getElementById('difficultyInput').value) || 4;
        
            if (difficulty < 1 || difficulty > 10) {
                alert("Difficulty level must be between 1 and 10.");
                return;
            }
        
            const data = document.getElementById("dataInput").value || "Default Data";
            document.getElementById("inputData").innerText = data;
            document.getElementById("stopMiningBtn").disabled = false;
            mining = true;
        
            visualizeMiners(numMiners); // Create miners first
            startShakingMiners(); // Then start the shaking animation
            beginMiningSimulation(data); // Begin mining
        }
        
        function stopMining() {
            mining = false;
            clearInterval(intervalId);
            clearInterval(powerIntervalId);
            document.getElementById("miningStatus").innerText = "Mining Stopped";
            document.getElementById("stopMiningBtn").disabled = true;
        
            stopShakingMiners(); // Stop shaking miners
        }
        

        function visualizeMiners(numMiners) {
            const visualizationDiv = document.getElementById('visualization');
            visualizationDiv.innerHTML = ''; // Clear previous visualization
        
            const radius = 120; // Radius for miners' initial positions
            const angleStep = (2 * Math.PI) / numMiners; // Determine spacing between miners
            const colors = ["#e74c3c", "#3498db", "#f1c40f", "#9b59b6", "#1abc9c", "#e67e22"];
        
            for (let i = 0; i < numMiners; i++) {
                const angle = i * angleStep;
                const x = radius * Math.cos(angle) + 175; // Static x-coordinate
                const y = radius * Math.sin(angle) + 175; // Static y-coordinate
        
                const miner = document.createElement('div');
                miner.classList.add('miner');
                miner.style.backgroundColor = colors[i % colors.length];
                miner.style.position = 'absolute'; // Position miners absolutely within the container
                miner.style.left = `${x}px`;
                miner.style.top = `${y}px`;
                miner.innerText = `M${i + 1}`;
                miner.id = `miner-${i}`; // Assign unique ID
                visualizationDiv.appendChild(miner);
            }
        }
        
        
        
        
        function drawConnection(index1, index2, angleStep, radius) {
            const x1 = radius * Math.cos(index1 * angleStep) + 175;
            const y1 = radius * Math.sin(index1 * angleStep) + 175;
            const x2 = radius * Math.cos(index2 * angleStep) + 175;
            const y2 = radius * Math.sin(index2 * angleStep) + 175;

            const connection = document.createElement('div');
            connection.classList.add('connection');
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            connection.style.width = `${distance}px`;
            connection.style.left = `${x1}px`;
            connection.style.top = `${y1}px`;

            const angleDeg = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
            connection.style.transform = `rotate(${angleDeg}deg)`;

            document.getElementById('visualization').appendChild(connection);
        }

        async function beginMiningSimulation(data) {
            nonce = 0;
            startTime = Date.now();
            document.getElementById("miningStatus").innerText = "Mining...";
            document.getElementById("targetHash").innerText = "0".repeat(difficulty) + "f".repeat(64 - difficulty);

            intervalId = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                document.getElementById("timeSpent").innerText = elapsed;
                document.getElementById("progressFill").style.width = `${Math.min((elapsed / miningDuration) * 100, 100)}%`;
                document.getElementById("hashRate").innerText = `${Math.floor(Math.random() * 100 + 50)}`;
                document.getElementById("nonce").innerText = nonce;
            }, 500);

            powerIntervalId = setInterval(() => {
                const currentPower = parseInt(document.getElementById("powerConsumption").innerText) || 0;
                document.getElementById("powerConsumption").innerText = `${currentPower + 10} W`;
            }, 1000);

            await mineBlock(data);
        }
        function startShakingMiners() {
            // Ensure miners are created before applying the shaking class
            setTimeout(() => {
                const miners = document.querySelectorAll('.miner');
                miners.forEach(miner => {
                    miner.classList.add('shaking'); // Add the shake animation
                });
            }, 0); // Small delay to ensure miners are in the DOM
        }
        
        
        function stopShakingMiners() {
            const miners = document.querySelectorAll('.miner');
            miners.forEach(miner => {
                miner.classList.remove('shaking'); // Remove the shake animation
            });
        }
        

        async function mineBlock(data) {
            let hash;
            const miners = document.querySelectorAll('.miner');
            const minerId = Math.floor(Math.random() * miners.length) + 1; // Random miner ID
        
            while (mining) {
                hash = sha256(data + nonce);
                document.getElementById("currentHash").innerText = hash;
                document.getElementById("attempts").innerText = nonce;
        
                if (hash.startsWith("0".repeat(difficulty))) {
                    addBlockToBlockchain(data, nonce, hash);
                    displayMinerMessage(minerId); // Display which miner mined the block
                    moveMinerToCenter(minerId); // Move the miner to the center
                    document.getElementById("miningStatus").innerText = "Block mined successfully!";
                    stopShakingMiners(); // Stop shaking miners after success
                    clearInterval(intervalId);
                    clearInterval(powerIntervalId);
                    mining = false;
                    document.getElementById("stopMiningBtn").disabled = true;
                    break;
                }
        
                nonce++;
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        
        
        
        function moveMinerToCenter(minerId) {
            const miner = document.getElementById(`miner-${minerId - 1}`); // Get the miner element by ID
            const visualizationDiv = document.getElementById('visualization');
        
            if (miner) {
                // Ensure miner is positioned relative to the visualization container
                miner.style.position = 'absolute';
        
                // Calculate the center of the container
                const containerRect = visualizationDiv.getBoundingClientRect();
                const minerRect = miner.getBoundingClientRect();
        
                // Calculate the center position for the miner within the visualization container
                const centerX = ((containerRect.width / 2) - (minerRect.width / 2))*1.5;
                const centerY =( (containerRect.height / 2) - (minerRect.height / 2))*1.1;
        
                // Apply the calculated center position
                miner.style.left = `${centerX}px`;
                miner.style.top = `${centerY}px`;
        
                // Add a smooth transition for the movement
                miner.style.transition = 'all 0.5s ease';
            }
        }
        
        
        
        
        // Function to display a message indicating the miner that generated the block
        function displayMinerMessage(minerId) {
            const visualizationDiv = document.getElementById('visualization');
            let messageDiv = document.getElementById('minerMessage');
        
            // Remove any existing popup
            if (messageDiv) {
                messageDiv.remove();
            }
        
            // Create a new popup message
            messageDiv = document.createElement('div');
            messageDiv.id = 'minerMessage';
            messageDiv.innerText = `Miner M${minerId} hit Reward 3.125 BTC`;
        
            // Style the popup message
            messageDiv.style.position = 'absolute';
            messageDiv.style.top = '70%'; // Move the popup closer to the top of the container
            messageDiv.style.left = '75%';
            messageDiv.style.transform = 'translate(-50%, 0)'; // Adjust for centering horizontally only
            messageDiv.style.backgroundColor = '#3498db';
            messageDiv.style.color = '#fff';
            messageDiv.style.padding = '15px 30px';
            messageDiv.style.borderRadius = '8px';
            messageDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            messageDiv.style.fontSize = '1.2em';
            messageDiv.style.textAlign = 'center';
            messageDiv.style.zIndex = '1000';
        
            // Add the message to the visualization container
            visualizationDiv.appendChild(messageDiv);
        
            // Automatically remove the popup after 3 seconds
            setTimeout(() => {
                 messageDiv.remove(); 
            }, 100000000);
        }
        

        function addBlockToBlockchain(data, nonce, hash) {
            const previousHash = blockchain.length ? blockchain[blockchain.length - 1].hash : "0";
            const block = { index: blockchain.length + 1, data, nonce, hash, previousHash };
            blockchain.push(block);
            displayBlockchain();
        }

        function displayBlockchain() {
            const blockchainContainer = document.getElementById("blockchain");
            blockchainContainer.innerHTML = '';
            blockchain.forEach(block => {
                const blockDiv = document.createElement("div");
                blockDiv.classList.add("block");
                blockDiv.innerHTML = `
                    <p><strong>Block #:</strong> ${block.index}</p>
                    <p><strong>Data:</strong> ${block.data}</p>
                    <p><strong>Nonce:</strong> ${block.nonce}</p>
                    <p><strong>Current Hash:</strong> <span class="hash-box current-hash">${block.hash}</span></p>
                    <p><strong>Previous Hash:</strong> <span class="hash-box previous-hash">${block.previousHash}</span></p>
                `;
                blockchainContainer.appendChild(blockDiv);
            });
        }
        
        

     

        function sha256(message) {
            return CryptoJS.SHA256(message).toString();
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }