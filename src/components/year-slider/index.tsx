import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import "./styles.scss";
import { useAppDispatch } from "../../store/store";
import { setYearRangeInStore } from "../../store/slices/YearRangeSlice";

const YearRangeSlider = () => {
  const [yearRange, setYearRange] = useState<[number, number]>([1972, 2022]);
  const dispatch = useAppDispatch();

  const handleChange = (value: [number, number]) => {
    console.log(value);
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
        min={1972}
        max={2022}
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

export default YearRangeSlider