import React from "react";

import CustomGradient, { FormValues as GradientStyleFormValues } from "./CustomGradient";
import Effect, { FormValues as EffectFormValues } from "./Effect";
import { Control } from "react-hook-form";

export type ModeFormValues = GradientStyleFormValues & EffectFormValues;

type WizardModeDefinition = {
  id: string;
  title: string;
  description: string;
  commandPayloadBuilder: (values: ModeFormValues) => string;
};

type WizardModeComponentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

type WizardModeComponent = React.ComponentType<WizardModeComponentProps> & {
  modeDefinition: WizardModeDefinition;
};

export const WIZARD_MODES_DEFAULT_FORM_VALUES = {
    ...CustomGradient.modeDefinition.defaultFormValues,
    ...Effect.modeDefinition.defaultFormValues,
};

export const WIZARD_MODES: WizardModeComponent[] = [CustomGradient, Effect];
export const WIZARD_MODES_DEFS = WIZARD_MODES.map(
  ({ modeDefinition }) => modeDefinition,
);
export const WIZARD_MODES_BY_ID = Object.fromEntries(
  WIZARD_MODES.map((mode) => [mode.modeDefinition.id, mode]),
);
