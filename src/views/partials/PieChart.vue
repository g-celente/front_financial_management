<script setup>
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { onMounted, ref, watch, defineProps } from "vue";

Chart.register(PieController, ArcElement, Tooltip, Legend);

const ctx = ref(null);

const props = defineProps({
    percentEntradas: Number,
    percentSaidas: Number,
});

const createChart = () => {
    const canvas = ctx.value.getContext("2d");

    new Chart(canvas, {
        type: "pie",
        data: {
            labels: ["Entradas", "Saídas"],
            datasets: [
                {
                    data: [props.percentEntradas, props.percentSaidas],
                    backgroundColor: ["#4CAF50", "#F44336"],
                    borderColor: ["#388E3C", "#D32F2F"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    });
};

onMounted(createChart);

watch(() => [props.percentEntradas, props.percentSaidas], createChart);
</script>

<template>
    <div class="chart">
        <canvas ref="ctx"></canvas>
    </div>
</template>

<style scoped>
.chart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%;
}
</style>
