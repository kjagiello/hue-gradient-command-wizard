import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { Control, Controller } from "react-hook-form";

enum EffectType {
  Candle = 0x01,
  Fireplace = 0x02,
  Prism = 0x03,
  Sunrise = 0x09,
  Sparkle = 0x0a,
  Opal = 0x0b,
  Glisten = 0x0c,
  Sunset = 0x0d,
  Underwater = 0x0e,
  Cosmos = 0x0f,
  Sunbeam = 0x10,
  Enchant = 0x11,
}

export type FormValues = {
  effect: {
    type: EffectType;
  };
};

type EffectProps = {
  control: Control<FormValues>;
};

function Effect({ control }: EffectProps) {
  return (
    <>
      <h2>2. Choose the effect</h2>
      <Paper variant="outlined">
        <Box p={2}>
          <FormControl fullWidth>
            <InputLabel id="input-style">Style</InputLabel>
            <Controller
              name="effect.type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select labelId="input-style" label="Style" {...field}>
                  <MenuItem value={EffectType.Candle}>Candle</MenuItem>
                  <MenuItem value={EffectType.Fireplace}>Fireplace</MenuItem>
                  <MenuItem value={EffectType.Prism}>Prism</MenuItem>
                  <MenuItem value={EffectType.Sunrise}>Sunrise</MenuItem>
                  <MenuItem value={EffectType.Sparkle}>Sparkle</MenuItem>
                  <MenuItem value={EffectType.Opal}>Opal</MenuItem>
                  <MenuItem value={EffectType.Glisten}>Glisten</MenuItem>
                  <MenuItem value={EffectType.Sunset}>Sunset</MenuItem>
                  <MenuItem value={EffectType.Underwater}>Underwater</MenuItem>
                  <MenuItem value={EffectType.Cosmos}>Cosmos</MenuItem>
                  <MenuItem value={EffectType.Sunbeam}>Sunbeam</MenuItem>
                  <MenuItem value={EffectType.Enchant}>Enchant</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Box>
      </Paper>
    </>
  );
}

Effect.modeDefinition = {
  id: "effect",
  title: "Apply an effect",
  description: "Generates a command payload that activates a Hue effect.",
  defaultFormValues: {
    effect: {
      type: EffectType.Candle,
    },
  },
  commandPayloadBuilder: (values: FormValues) => {
    const data: number[] = [];
    data.push(0x21, 0x00, 0x01);
    data.push(values.effect.type);

    const blob = new Uint8Array(data);
    return Array.from(blob)
      .map((i) => i.toString(16).padStart(2, "0"))
      .join("");
  },
};

export default Effect;
