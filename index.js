const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateArrivalTime(startTime, travelSeconds) {
    let [hours, minutes, seconds] = startTime.split(':').map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds + travelSeconds;
    let newHours = Math.floor(totalSeconds / 3600) % 24;
    let newMinutes = Math.floor((totalSeconds % 3600) / 60);
    let newSeconds = totalSeconds % 60;
    newHours = String(newHours).padStart(2, '0');
    newMinutes = String(newMinutes).padStart(2, '0');
    newSeconds = String(newSeconds).padStart(2, '0');
    return `${newHours}:${newMinutes}:${newSeconds}`;
}

function calculateTravelTime(startTime, endTime) {
    let [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
    let [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);
    let startTotalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
    let endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;
    let travelSeconds = endTotalSeconds - startTotalSeconds;
    let travelHours = Math.floor(travelSeconds / 3600);
    let travelMinutes = Math.floor((travelSeconds % 3600) / 60);
    let travelSecondsRemaining = travelSeconds % 60;
    return `${travelHours} jam, ${travelMinutes} menit, ${travelSecondsRemaining} detik`;
}

function askForTravelTime() {
    rl.question('Masukkan waktu berangkat (HH:MM:SS): ', (startTime) => {
        rl.question('Masukkan waktu tiba (HH:MM:SS): ', (endTime) => {
            console.log(`Waktu perjalanan: ${calculateTravelTime(startTime, endTime)}`);
            rl.close();
        });
    });
}

function askForArrivalTime() {
    rl.question('Masukkan waktu berangkat (HH:MM:SS): ', (startTime) => {
        rl.question('Masukkan durasi perjalanan dalam detik: ', (travelSeconds) => {
            console.log(`Waktu tiba: ${calculateArrivalTime(startTime, Number(travelSeconds))}`);
            rl.close();
        });
    });
}

console.log("Pilih opsi:");
console.log("1. Hitung waktu tiba");
console.log("2. Hitung durasi perjalanan");
rl.question("Masukkan pilihan (1/2): ", (choice) => {
    if (choice === '1') {
        askForArrivalTime();
    } else if (choice === '2') {
        askForTravelTime();
    } else {
        console.log("Pilihan tidak valid");
        rl.close();
    }
});
