import React, { useState, useEffect } from 'react';
import { searchBuffer } from '../../utils/searchBuffer'
// 引入 ECharts 主模块
// import echarts from 'echarts/lib/echarts';
// // 引入柱状图
// import 'echarts/lib/chart/bar';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';

// @5.x版本以上
import * as echarts from 'echarts';

import 'echarts/map/js/china';

/* 获取json文件 */
// http://datav.aliyun.com/tools/atlas/#&lat=31.769817845138945&lng=104.29901249999999&zoom=4
import test1 from './test1.png'
import henanJson from './henan.json'
import shangraoJson from './shangrao.json'

const Test = (props) => {
    console.log(props.location.search)
    console.log(searchBuffer(props.location.search, "id"))
    // useState [] = useState()

    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        // myChart.setOption({
        //     title: { text: 'ECharts 入门示例' },
        //     tooltip: {},
        //     xAxis: {
        //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // });
        const option = {
            title: {
                text: '各省份使用情况',
                subtext: '数据暂虚构',
                left: 'center'
            },
            // hover弹出框
            tooltip: {
                trigger: 'item'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            // 颜色范围阈值区分方式1
            // dataRange: {
            //     x: 'left',
            //     y: 'bottom',
            //     splitList: [
            //         { start: 1500, color: '#540001' },
            //         { start: 1000, end: 1500, color: '#99102e' },
            //         { start: 800, end: 1000, color: '#ba2784' },
            //         { start: 600, end: 800, color: '#b33970' },
            //         { start: 400, end: 600, color: '#b35462' },
            //         { start: 200, end: 400, color: '#b38499' },
            //         { end: 100, label: '100(人口数量)', color: '#ffd7ed' }
            //     ],
            //     color: ['#eee', '#949fb1', '#f3ce85']
            // },
            // 颜色阈值区分方式二
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            grid: {
                height: '100%',
                width: '100%'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['新增设计',
                    //  'iphone4', 'iphone5'
                ]
            },


            series: [
                {
                    // tooltip弹出框框内上面的名字显示
                    name: '新增设计',
                    type: 'map',
                    mapType: 'china',
                    // 不显示小点
                    showLegendSymbol: false,
                    roam: false,
                    label: {
                        show: false
                        // normal: {
                        //     show: false
                        // },
                        // emphasis: {
                        //     show: true
                        // }
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,//默认是否显示省份名称    
                            },
                            // areaStyle: {
                            //     color: '#000000',//默认的地图板块颜色
                            // },
                            areaColor: '#333',
                            borderWidth: 1,
                            borderColor: '#e1e1e1',
                        },
                        emphasis: {
                            label: {
                                show: false,//选中状态是否显示省份名称
                            },
                            // 这样设置才生效
                            areaColor: '#ccc'
                            // areaStyle: {
                            //     color: '#cccccc',//选中状态的地图板块颜色
                            // },
                        },
                    },
                    data: [
                        {
                            name: '北京', selected: true, value: Math.round(Math.random() * 1000), itemStyle: {
                                normal: {
                                    label: {
                                        show: false,//默认是否显示省份名称    
                                    },
                                    // areaStyle: {
                                    //     color: '#000000',//默认的地图板块颜色
                                    // },
                                    areaColor: '#333',
                                    borderWidth: 1,
                                    borderColor: '#e1e1e1',
                                },
                                emphasis: {
                                    label: {
                                        show: false,//选中状态是否显示省份名称
                                    },
                                    // 这样设置才生效
                                    areaColor: 'red'
                                    // areaStyle: {
                                    //     color: '#cccccc',//选中状态的地图板块颜色
                                    // },
                                },
                            },
                        },
                        { name: '天津', value: Math.round(Math.random() * 1000) },
                        { name: '上海', value: Math.round(Math.random() * 1000) },
                        { name: '重庆', value: Math.round(Math.random() * 1000) },
                        { name: '河北', value: Math.round(Math.random() * 1000) },
                        { name: '河南', value: Math.round(Math.random() * 1000) },
                        { name: '云南', value: Math.round(Math.random() * 1000) },
                        { name: '辽宁', value: Math.round(Math.random() * 1000) },
                        { name: '黑龙江', value: Math.round(Math.random() * 1000) },
                        { name: '湖南', value: Math.round(Math.random() * 1000) },
                        { name: '安徽', value: Math.round(Math.random() * 1000) },
                        { name: '山东', value: Math.round(Math.random() * 1000) },
                        { name: '新疆', value: Math.round(Math.random() * 1000) },
                        { name: '江苏', value: Math.round(Math.random() * 1000) },
                        { name: '浙江', value: Math.round(Math.random() * 1000) },
                        { name: '江西', value: Math.round(Math.random() * 1000) },
                        { name: '湖北', value: Math.round(Math.random() * 1000) },
                        { name: '广西', value: Math.round(Math.random() * 1000) },
                        { name: '甘肃', value: Math.round(Math.random() * 1000) },
                        { name: '山西', value: Math.round(Math.random() * 1000) },
                        { name: '内蒙古', value: Math.round(Math.random() * 1000) },
                        { name: '陕西', value: Math.round(Math.random() * 1000) },
                        { name: '吉林', value: Math.round(Math.random() * 1000) },
                        { name: '福建', value: Math.round(Math.random() * 1000) },
                        { name: '贵州', value: Math.round(Math.random() * 1000) },
                        { name: '广东', value: Math.round(Math.random() * 1000) },
                        { name: '青海', value: Math.round(Math.random() * 1000) },
                        { name: '西藏', value: Math.round(Math.random() * 1000) },
                        { name: '四川', value: Math.round(Math.random() * 1000) },
                        { name: '宁夏', value: Math.round(Math.random() * 1000) },
                        { name: '海南', value: Math.round(Math.random() * 1000) },
                        { name: '台湾', value: Math.round(Math.random() * 1000) },
                        { name: '香港', value: Math.round(Math.random() * 1000) },
                        { name: '澳门', value: Math.round(Math.random() * 1000) }
                    ]
                },

            ]
        }

        myChart.setOption(option)

        const henandata = [
            { name: '郑州市', selected: true, point: [113.65, 34.76],value: 1 },
            { name: '南阳市', selected: true, point: [112.53, 33.01],value: 2 }
        ]
        var myChart = echarts.init(document.getElementById('province'));
        echarts.registerMap('henan', henanJson);
        myChart.setOption({
            title: {
                text: '各省份使用情况',
                subtext: '数据暂虚构',
                left: 'center'
            },
            tooltip: {
                // trigger:'axis',
                trigger: 'item',
                
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['新增设计']
            },
            /* 自定义图标开始 */
            geo: {
                map: 'henan'
            },
            series: [{

                name: 'test',
                // type: 'map',
                // map: 'henan',

                /* 自定义图标开始 */
                type: 'custom',
                coordinateSystem: 'geo',
                renderItem(params, api) {
                    //具体实现自定义图标的方法
                    return {
                        type: "image",
                        style: {
                            image: test1,
                            x: api.coord([
                                henandata[params.dataIndex].point[0],
                                henandata[params.dataIndex].point[1]
                                //   v.data[params.dataIndex].value[0],
                                //   v.data[params.dataIndex].value[1]
                            ])[0],
                            y: api.coord([
                                henandata[params.dataIndex].point[0],
                                henandata[params.dataIndex].point[1]
                                // 34.76
                                //   v.data[params.dataIndex].value[0],
                                //   v.data[params.dataIndex].value[1]
                            ])[1]
                        }
                    };
                },
                /* 自定义图标结束 */
                itemStyle: {
                    normal: {
                        label: {
                            show: true,//默认是否显示省份名称    
                        },
                        // areaStyle: {
                        //     color: '#000000',//默认的地图板块颜色
                        // },
                        areaColor: '#333',
                        borderWidth: 1,
                        borderColor: '#e1e1e1',
                    },
                    emphasis: {
                        label: {
                            show: true,//选中状态是否显示省份名称
                        },
                        // 这样设置才生效
                        areaColor: '#ccc',
                        // areaStyle: {
                        //     color: '#cccccc',//选中状态的地图板块颜色
                        // },
                    },
                },
                data: henandata
            }]
        });


        //  http://datav.aliyun.com/tools/atlas/#&lat=31.769817845138945&lng=104.29901249999999&zoom=4
        var shangraodata = [
            { "value": 335, "name": "鄱阳县" },
            { "value": 710, "name": "余干县" },
            { "value": 234, "name": "万年县" },
            { "value": 1525, "name": "弋阳县" },
            { "value": 1548, "name": "德兴市" },
            { "value": 335, "name": "婺源县" },
            { "value": 710, "name": "横峰县" },
            { "value": 1234, "name": "铅山县" },
            { "value": 665, "name": "广信区" },
            { "value": 1148, "name": "玉山县" },
            { "value": 834, "name": "信州区" },
            { "value": 255, "name": "广丰区" },

        ]
        var dataleg = [];
        for (var i = 0; i < shangraodata.length; i++) {
            dataleg[i] = shangraodata[i].name
        }
        console.log(dataleg)
        console.log(shangraoJson)
        var myChart = echarts.init(document.getElementById('city'));
        echarts.registerMap('shangrao2', shangraoJson);
        myChart.setOption({
            title: {// 图表标题
                text: '上饶人口密度地图',
                subtext: '纯属虚构',
                left: 'center',

            },
            legend: {  // 图例
                orient: 'vertical',// 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
                left: 'left',
                // data:dataleg 

            },
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: [
                    { start: 1500, color: '#540001' },
                    { start: 1000, end: 1500, color: '#99102e' },
                    { start: 800, end: 1000, color: '#ba2784' },
                    { start: 600, end: 800, color: '#b33970' },
                    { start: 400, end: 600, color: '#b35462' },
                    { start: 200, end: 400, color: '#b38499' },
                    { end: 100, label: '100(人口数量)', color: '#ffd7ed' }
                ],
                color: ['#eee', '#949fb1', '#f3ce85']
            },
            tooltip: {//提示框组件
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}人',

            },
            series: [{
                name: "上饶人口密度",
                type: 'map',
                map: 'shangrao2',
                data: shangraodata


            }]
        });

    }, [])




    return (
        <div>
            <div id="main" style={{ width: 700, height: 700 }}></div>

            <div id="province" style={{ width: 700, height: 700 }}></div>

            <div style={{position: 'relative'}}>
                <div id="city" style={{ width: 700, height: 700}}></div>
                <div style={{position: 'absolute',left: '350px',top: '350px', color: '#fff'}}>2222</div>
            </div>
            
        </div>
    );
}

export default Test;
