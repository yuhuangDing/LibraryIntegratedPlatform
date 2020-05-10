export const option={
    color: [
        "#2ec7c9",
        "#b6a2de",
        "#5ab1ef",
        "#ffb980",
        "#d87a80",
        "#8d98b3",
        "#e5cf0d",
        "#97b552",
        "#95706d",
        "#dc69aa",
        "#07a2a4",
        "#9a7fd1",
        "#588dd5",
        "#f5994e",
        "#c05050",
        "#59678c",
        "#c9ab00",
        "#7eb00a",
        "#6f5553",
        "#c14089"
    ],
    title: {
        "textStyle": {
            "color": "#008acd"
        },
        "subtextStyle": {
            "color": "#aaa"
        }
    },
    line: {
        "itemStyle": {
            "normal": {
                "borderWidth": 1
            }
        },
        "lineStyle": {
            "normal": {
                "width": 2
            }
        },
        "symbolSize": 3,
            "symbol": "emptyCircle",
            "smooth": true
    },
    tooltip: {
        "axisPointer": {
            "lineStyle": {
                "color": "#008acd",
                    "width": "1"
            },
            "crossStyle": {
                "color": "#008acd",
                    "width": "1"
            }
        }
    },
    xAxis: {
        type: 'category',   // 还有其他的type，可以去官网喵两眼哦
            data: [],   // x轴数据
            name: '',   // x轴名称
            // x轴名称样式
            nameTextStyle: {
            fontWeight: 400,
                fontSize: 12
        }
    },
    yAxis: {
        type: 'value',
            name: '数量',   // y轴名称
            // y轴名称样式
            nameTextStyle: {
            fontWeight: 400,
                fontSize: 12
        }
    },
    series: [
        {
            data: [],
            type: 'line'
        }]

}