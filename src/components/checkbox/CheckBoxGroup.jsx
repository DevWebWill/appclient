import CheckBox from "./CheckBox";

const CheckBoxGroup = ({options, selectedValues, setSelectedValues, onChange, errorText, checked, flexCol }) => {
    const error = errorText ? (
        <p className="mt-2 text-sm text-red-600">{errorText}</p>
    ) : null;

    const handleOnchange = (val, checked) => {
        if (onChange) {
            if (checked) {
                let index = selectedValues.indexOf(val);
                if (index === -1) {
                    setSelectedValues(selectedValues => [...selectedValues, val])
                }
            } else {
                let index = selectedValues.indexOf(val);
                if (index !== -1) {
                    setSelectedValues(selectedValues.filter(item => item !== val));
                }
            }
        }
    };

        return (
            <div className="flex flex-col">
                <div className={`flex ${flexCol ? 'flex-col' : 'flex-row'}`}>
                {options.map((option, index) => {
                    return (
                    <div className="flex items-center justify-between mr-4" key={index}>
                        <CheckBox
                            id={option.label}
                            labelText={option.label}
                            value={option.value}
                            name={option.value}
                            onChange={(e) => {
                                handleOnchange(option.value, e.target.checked);
                            }}
                            checked={
                                checked ? checked : selectedValues.includes(option.value)
                            }
                            {...option}
                        />
                    </div>
                    );
                })}
                </div>
                {error}
            </div>
        );
    }


CheckBoxGroup.defaultProps = {
    indeterminate: false,
    onChange: () => {},
    errorText: "",
    selectedValues: [],
    options: [],
    flexCol: true
};

export default CheckBoxGroup;
