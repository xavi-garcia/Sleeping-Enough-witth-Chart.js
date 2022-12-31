const ctx = document.getElementById('myChart').getContext("2d");

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58,123,213,1)");
gradient.addColorStop(1, "rgba(0,210,255,0.3)");

let delayed;

const form = document.getElementById('form');

let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

// let span = document.getElementsByClassName("close")[0];

const Mon = document.getElementById("monday");
const Tue = document.getElementById("tuesday");
const Wed = document.getElementById("wednesday");
const Thu = document.getElementById("thursday");
const Fri = document.getElementById("friday");
const Sat = document.getElementById("saturday");
const Sun = document.getElementById("sunday");

btn.onclick = function() {
    modal.style.display = "block";
};

// span.onclick = function() {
//   modal.style.display = "none";
// };

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.remove();
    createData();
    enoughSleep()
});

function createData (){
    const labels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

const data = {
    labels,
    datasets: [
        {
            data: [Mon.value, Tue.value, Wed.value, Thu.value, Fri.value, Sat.value, Sun.value],
            label: "Sleeping hours in a week",
            fill: true,
            backgroundColor: gradient,
        },
    ],
};

const config = {
    type: "line",
    data: data,
    options: {
        responsive: true,
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return  value + "hs"
                    },
                },
            },
        },
    },
};

const myChart = new Chart(ctx, config)
};

function enoughSleep () {
    if(Mon.value < 8 || Tue.value < 8|| Wed.value < 8 || Thu.value < 8 || Fri.value < 8 || Sat.value < 8 || Sun.value < 8){
        Swal.fire('Remember than a healthy adult should be sleeping around 8 hours a day')
    }
};