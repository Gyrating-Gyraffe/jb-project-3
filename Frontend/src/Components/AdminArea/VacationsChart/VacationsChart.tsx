import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import Loading from "../../LayoutArea/Loading/Loading";
import "./VacationsChart.css";

type VacationsChartProps = {
    height: number;
    vacations: VacationModel[];
}

function VacationsChart(props: VacationsChartProps): JSX.Element {


    // Format the data for the chart:
    const chartData = props.vacations.map(v => {
        return { "name": v.destination.split(',')[0], "Followers": v.followerCount };
    });

    return (
        <ResponsiveContainer width="100%" height={'100%'} className='VacationsChart'>
            <BarChart data={chartData} title="Vacations Report">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} width={20} />
                <Tooltip />

                <Bar dataKey="Followers" fill="#4287f5" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default VacationsChart;
