let intervalID = null;
let intervalPeriodID = null;

//функция отрисовки маятника
function drawPendulum(position, mass, onLoad) {
    const canvas = document.getElementById('canvas');
    const split = 5; // разбиение пружины
    const springLen = 150; // длина пружины
    const radius = (Math.cbrt(mass)/2) * 50;
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        //очищаем канвас
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // рисуем заделку
        ctx.moveTo(120, 50);
        ctx.lineTo(180, 50);
        ctx.moveTo(150, 50);
        ctx.lineTo(150, 80);
        ctx.lineTo(120, 95);

        //рисуем пружину
        let dir = false; // флаг направления отрисовки
        let x = 120, y = 95;
        for (let i = 0; i < split; i++){
            y += (springLen + position) / 5;
            // x += 15
            if(dir)
                x -= 60
            else
                x += 60
            ctx.lineTo(x, y);
            dir = !dir;
        }
        y += 15;
        ctx.lineTo(150, y);
        y += 30;
        ctx.lineTo(150, y);
        ctx.stroke();

        // рисуем груз
        y += radius;
        ctx.moveTo(150, y);
        ctx.beginPath();
        ctx.arc(150,y,radius,0,Math.PI*2,true)
        ctx.closePath();
        if(onLoad)
            ctx.stroke();
    }
}

// функция проигрывания анимации
function Play(mass, k, x0) {
    let x = 0;
    let time = 0;
    let frec = Math.sqrt(k / mass);
    let waves = 0;
    let period = (2 * Math.PI) / frec; // период калебаний (нужен для подсчета колебаний)

    //очищаем интервалы если они запущены
    if (intervalID !== null || intervalPeriodID !== null) {
        clearInterval(intervalID);
        clearInterval(intervalPeriodID);
    }

    // интервал для подсчета колебаний
    intervalPeriodID = setInterval(() => waves++, Math.floor(period * 1000));

    // интервал обновление анимации
    intervalID = setInterval(() => {
        x = (x0 / 100) * Math.cos(frec * time); // мат-модель
        drawPendulum(x * 100, mass); // перерисовка
        $( "#frec" ).val( Number(frec).toFixed(2) );
        $( "#waves" ).val( waves );
        $( "#position" ).val( Number(x * 100).toFixed(2) + " см");
        $( "#time" ).val( Math.floor(time) + " с");
        time += 0.05; // приращение времени равно timeout итервала
    }, 50);
}

//функция остановки
function Stop() {
    clearInterval(intervalID);
    clearInterval(intervalPeriodID);
}