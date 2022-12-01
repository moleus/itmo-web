import React, {FC} from 'react';
import {Form} from "react-bootstrap";
import {range} from "../../util/Util";

type Props = {
    idPrefix: string
}

const RadioChooser: FC<Props> = ({idPrefix}) => {
    return (
        <Form.Group>
            {range(5, 1).map((valueLabel: number) => (
                <Form.Check inline key={valueLabel}
                            label={valueLabel}
                            name="input-radio-buttons-group"
                            type="radio"
                            id={`${idPrefix}-radio-${valueLabel}`}
                />
            ))}
        </Form.Group>
    )
}

export default RadioChooser;
