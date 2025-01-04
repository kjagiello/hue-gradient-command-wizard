import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useForm } from "react-hook-form";
import CardSelect from "./components/CardSelect";
import CommandRenderer from "./components/CommandRenderer";
import {
  ModeFormValues,
  WIZARD_MODES_BY_ID,
  WIZARD_MODES_DEFAULT_FORM_VALUES,
  WIZARD_MODES_DEFS,
} from "./modes";

type FormValues = ModeFormValues & {
  mode: string | null;
};

const defaultValues = {
  mode: null,
  ...WIZARD_MODES_DEFAULT_FORM_VALUES,
};

function Wizard() {
  const { watch, control } = useForm<FormValues>({ defaultValues });

  const activeMode = watch("mode");
  const ModeComponent = activeMode ? WIZARD_MODES_BY_ID[activeMode] : null;

  const state = watch();
  const commandPayload =
    activeMode !== null
      ? WIZARD_MODES_BY_ID[activeMode].modeDefinition.commandPayloadBuilder(
          state,
        )
      : null;

  return (
    <>
      <Box p={3}>
        <h1>Hue Gradient command generator</h1>

        <h2>1. Select mode</h2>
        <CardSelect name="mode" control={control} options={WIZARD_MODES_DEFS} />

        {ModeComponent && <ModeComponent control={control} />}

        {commandPayload !== null && (
          <>
            <h2>3. Enjoy!</h2>
            <Paper variant="outlined">
              <Box pb={2} pl={2} pr={2}>
                <CommandRenderer payload={commandPayload} />
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </>
  );
}

export default Wizard;
