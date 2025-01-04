import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { GradientCommandBuilder, GradientStyle } from "./utils";
import { Control, Controller } from "react-hook-form";
import GradientPicker from "../../components/GradientPicker";

export type FormValues = {
  gradient: {
    style: GradientStyle;
    colors: { id: string; value: string }[];
    transitionTime: number;
    segments: number;
    offset: number;
  };
};

type CustomGradientProps = {
  minColors?: number;
  maxColors?: number;
  control: Control<FormValues>;
};

function CustomGradient({ control }: CustomGradientProps) {
  return (
    <>
      <h2>2. Choose the gradient colors</h2>
      <Paper variant="outlined">
        <Box p={2}>
          <GradientPicker
            name="gradient.colors"
            control={control}
            minCount={2}
            maxCount={9}
          />
        </Box>
      </Paper>

      <h2>3. Adjust gradient settings</h2>
      <Paper variant="outlined">
        <Box p={2}>
          <FormControl fullWidth>
            <InputLabel id="input-style">Style</InputLabel>
            <Controller
              name="gradient.style"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select labelId="input-style" label="Style" {...field}>
                  <MenuItem value={GradientStyle.Linear}>Linear</MenuItem>
                  <MenuItem value={GradientStyle.Scattered}>Scattered</MenuItem>
                  <MenuItem value={GradientStyle.Mirrored}>Mirrored</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Box sx={{ m: 2 }} />

          <FormControl fullWidth>
            <Typography id="input-transition-time" gutterBottom>
              Transition time
            </Typography>
            <Controller
              name="gradient.transitionTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  min={0}
                  step={1}
                  max={255}
                  {...field}
                  valueLabelDisplay="auto"
                  aria-labelledby="input-transition-time"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography id="input-segments" gutterBottom>
              Segments
            </Typography>
            <Controller
              name="gradient.segments"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  min={3}
                  step={1}
                  max={31}
                  {...field}
                  valueLabelDisplay="auto"
                  aria-labelledby="input-segments"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography id="input-offset" gutterBottom>
              Offset
            </Typography>
            <Controller
              name="gradient.offset"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  min={0}
                  step={1}
                  max={7}
                  {...field}
                  valueLabelDisplay="auto"
                  aria-labelledby="input-offset"
                />
              )}
            />
          </FormControl>
        </Box>
      </Paper>
    </>
  );
}

CustomGradient.modeDefinition = {
  id: "gradient",
  title: "Apply a custom gradient",
  description: "Generates a command payload that activates the chosen gradient",
  defaultFormValues: {
    gradient: {
      style: 0x00,
      colors: [{ value: "#00ff00" }, { value: "#ff0000" }],
      transitionTime: 4,
      segments: 5,
      offset: 0,
    },
  },
  commandPayloadBuilder: (values: FormValues) => {
    const builder = new GradientCommandBuilder(
      values.gradient.colors.map(({ value }) => value),
      values.gradient.transitionTime,
      values.gradient.segments,
      values.gradient.offset,
      values.gradient.style,
    );
    const blob = builder.serialize();
    return Array.from(blob)
      .map((i) => i.toString(16).padStart(2, "0"))
      .join("");
  },
};
export default CustomGradient;
