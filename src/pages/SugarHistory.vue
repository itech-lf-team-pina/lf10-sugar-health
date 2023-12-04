<template>
  <BContainer>
    <h1> Your sugar history </h1>
    <p>
      This page has a list showing how much you consumed each day.
    </p>
    <div class="chart">
      <h2>Your last 7 days of sugar</h2>
      <Bar v-if="loaded" :options="chartOptions" :data="chartData" />
    </div>

    <br/>
    <h2>Your sugar history</h2>
    <div v-for="item in sugarHistoryData" v-bind:key="item.id">
      <div class="history-card">
        <h3>{{ item.description }} <small>({{ item.timestampDate }})</small></h3>
        <p>Sugar intake: {{ item.intake }}g</p>
      </div>

    </div>
  </BContainer>
</template> 


<script>
import { BACKEND_URL } from "@/common/constants"
import { dateArrayToDateString, dateArrayToDateTime } from "@/common/utils";
import moment from "moment";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {store} from "@/store/store";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'sugarHistory',
  data() {
    return {
      sugarHistoryData: [],
      chartData: null,
      loaded: false,
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          }
        }
      }
    }
  },
  methods: {
    async getSugarDataFromServer(url, option) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {},
        })

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON

          console.log(data);
          if (option === "history") {
            data.forEach((item) => {
              item.timestampDate = moment(dateArrayToDateTime(item.timestamp)).format("DD.MM.YYYY HH:mm");
            });
            this.sugarHistoryData = data;
          } else if (option === "chart") {
            const chartData = {
              datasets: [],
              labels: [],
            };

            const dataset = {
              label: "Letzte 7 Tage",
              backgroundColor: '#f87979',
              data: []
            };

            data.forEach((item) => {
              dataset.data.push(item.sugar_total);
              chartData.labels.push(dateArrayToDateString(item.date));

            });
            chartData.datasets.push(dataset);

            console.log(chartData);

            this.chartData = chartData;
            this.loaded = true;
          }
        } else {
          // Handle error
          console.error("Error sending data to the server.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  },
  components: {
    Bar
  },
  mounted() {
    const profileId = store.state.profileId
    this.getSugarDataFromServer(`${BACKEND_URL}/account/${profileId}/sugar`, "history");
    this.getSugarDataFromServer(`${BACKEND_URL}/sugar/${profileId}/stats/LAST_7_DAYS`, "chart");
  }
}
</script>

<style scoped>
.history-card {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: rgba(81, 177, 91, 0.6) 0 0 4px;
}

.history-card:hover {
  box-shadow: rgba(81, 177, 91, 0.6) 0 0 8px;
}

.history-card p {
  margin: 1vh 1vw;
  padding: 0;
}

.history-card {
  color: #212121;
}

.history-card h3 {
  margin: 0;
  padding: 0;
  font-size: 1rem;
}

.history-card small {
  margin: 0;
  padding: 0;
  font-size: 0.95rem;

}

.chart {
  width: 60vw;
  margin: 0 2vw;
}
</style>
