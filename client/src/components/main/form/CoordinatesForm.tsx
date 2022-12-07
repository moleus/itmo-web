import React from "react";
import {useForm} from "react-hook-form";
import {range} from "../../util/Util";
import {hitAPI} from "../../../api/hitsService";
import {setR} from "../../../store/reducers/FormCoordinatesSlice";
import {useAppDispatch} from "../../../hooks/redux";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import Text from "@jetbrains/ring-ui/dist/text/text";
import TabTrap from "@jetbrains/ring-ui/dist/tab-trap/tab-trap";

import ValidatedInput from "../common/ValidatedInput";
import Button from "../../common/Button";
import RangeSlider from "../../common/RangeSlider";

import 'rc-slider/assets/index.css';
import "@jetbrains/ring-ui/dist/style.css";

type FormValues = {
    x: number;
    y: number;
    r: number;
};

const formSchema = yup.object({
    x: yup.number().moreThan(-5).lessThan(5).required(),
    y: yup.number().moreThan(-5).lessThan(5).required(),
}).required();

const CoordinatesForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver: yupResolver(formSchema)});
    const [createHit, {}] = hitAPI.useCreateHitMutation({fixedCacheKey: 'shared-create-hit'});
    const [deleteHits, {}] = hitAPI.useDeleteAllHitsMutation();
    const dispatch = useAppDispatch();

    const onSubmit = handleSubmit((data: FormValues) => {
        createHit({x: data.x, y: data.y, r: data.r})
    });

    const onReset = () => deleteHits();

    const onUpdateR = (newRadius: number) => dispatch(setR(newRadius));

    return (
        <section className="grid-section input-section">
            <TabTrap>
                <form id="input-form">
                    <ValidatedInput label="X" error={errors.x}>
                        <select className="input-field" {...register("x", {required: true})}>
                            {
                                range(10, -4).map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))
                            }
                        </select>
                    </ValidatedInput>
                    <ValidatedInput label="Y" error={errors.y}>
                        <input className={`ring-input ${errors.y && "ring-input_error"} ring-input-size_m input-field`}
                               {...register("y", {required: true, min: 0, max: 5})}/>
                    </ValidatedInput>

                    <Text>R</Text>
                    <RangeSlider onChange={onUpdateR} min={0.3} max={4} defaultValue={1}/>

                    <div className="input-container">
                        <Button onClick={onSubmit} label="Add"/>
                        <Button onClick={onReset} label="Reset"/>
                    </div>
                </form>
            </TabTrap>
        </section>
    )
}

export default CoordinatesForm;