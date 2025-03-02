import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import "./styles.scss";
import { RootState, useAppDispatch } from "../../store/store";
import { setYearRangeInStore } from "../../store/slices/YearRangeSlice";
import { useSelector } from "react-redux";


export const YearRangeSlider = () => {
  const [yearRange, setYearRange] = useState<[number, number]>([1974, 2023]);
  const dispatch = useAppDispatch();

  const handleChange = (value: [number, number]) => {
    setYearRange(value);
    dispatch(setYearRangeInStore({ yearRange: value }));
  };

  return (
    <div className="slider">
      <div className="slider__selected">{yearRange[0]} - {yearRange[1]}</div>
      <Slider.Root
        className="slider__root"
        value={yearRange}
        onValueChange={handleChange}
        min={1974}
        max={2023}
        step={1}
      >
        <Slider.Track className="slider__track">
          <Slider.Range className="slider__range" />
        </Slider.Track>
        <Slider.Thumb className="slider__thumb" aria-label="Start Year" />
        <Slider.Thumb className="slider__thumb" aria-label="End Year" />
      </Slider.Root>
    </div>
  );
};

interface SliderProps {
    onChange: (value: number) => void; // Callback function type
  }

export const YearSlider: React.FC<SliderProps> = ({ onChange }) => {

    const yearRange: [number, number] = useSelector(
        (state: RootState) => state.yearRange.YearRange
    );

    const [value, setValue] = useState([yearRange[1]]);

    const handleValueChange = (newValue: number[]) => {
        setValue(newValue);
        onChange(newValue[0]);
    };

    return (
        <div style={{  }}>
            <Slider.Root
                className="slider__root"
                value={value}
                onValueChange={handleValueChange}
                min={yearRange[0]}
                max={yearRange[1]}
                step={1}
            >
                <Slider.Track className="slider__track">
                <Slider.Range className="slider__range" />
                </Slider.Track>
                <Slider.Thumb className="slider__thumb" />
            </Slider.Root>
        </div>
    );
};
