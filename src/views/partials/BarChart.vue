<script setup>
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { onMounted, ref, watch, defineProps } from "vue";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ctx = ref(null);

const props = defineProps({
    movimentacoesPorCategoria: {
        type: Array,
        required: true,
    },
});

// Função para gerar uma cor aleatória
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const createChart = () => {
    if (Array.isArray(props.movimentacoesPorCategoria) && props.movimentacoesPorCategoria.length > 0) {
        const canvas = ctx.value.getContext("2d");

        const labels = props.movimentacoesPorCategoria.map(item => item.categoria);
        const dataset = props.movimentacoesPorCategoria.map(item => item.total);

        // Gerar uma cor única para cada categoria
        const backgroundColors = props.movimentacoesPorCategoria.map(() => generateRandomColor());
        const borderColors = backgroundColors.map(color => color);  // Usando a mesma cor para a borda

        new Chart(canvas, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Movimentações por Categoria",
                        data: dataset,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
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
    }
};

onMounted(createChart);
watch(() => props.movimentacoesPorCategoria, createChart);
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
