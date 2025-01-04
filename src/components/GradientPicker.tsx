import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import {
  ArrayPath,
  Control,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { Box, CardHeader, CardMedia, IconButton, Popover } from "@mui/material";
import Wheel from "@uiw/react-color-wheel";

type GradientPickerProps<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  minCount: number;
  maxCount: number;
};

function GradientPicker<TFieldValues extends FieldValues>({
  control,
  name,
  minCount,
  maxCount,
}: GradientPickerProps<TFieldValues>) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
      {fields.map((field, idx) => (
        <Card key={idx} variant="outlined">
          <CardActionArea>
            <CardMedia>
              <PopupState variant="popover" popupId={`popover-${idx}`}>
                {(popupState) => (
                  <>
                    <Box
                      p={4}
                      // @ts-expect-error: Not sure if it is possible to type it correctly
                      sx={{ backgroundColor: field.value, textAlign: "center" }}
                      {...bindTrigger(popupState)}
                    >
                      #{idx + 1}
                    </Box>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Card>
                        <CardHeader
                          title="Choose color"
                          action={
                            fields.length > minCount && (
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  remove(idx);
                                  popupState.close();
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )
                          }
                        />
                        <CardContent>
                          <Wheel
                            // @ts-expect-error: Not sure if it is possible to type it correctly
                            color={field.value}
                            onChange={(newColor) =>
                              // @ts-expect-error: Not sure if it is possible to type it correctly
                              update(idx, { value: newColor.hex })
                            }
                          />
                        </CardContent>
                      </Card>
                    </Popover>
                  </>
                )}
              </PopupState>
            </CardMedia>
          </CardActionArea>
        </Card>
      ))}
      {fields.length < maxCount && (
        <Card variant="outlined">
          <CardActionArea>
            <CardMedia>
              <Box
                p={3}
                // @ts-expect-error: Not sure if it is possible to type it correctly
                onClick={() => append({ value: "#9933ff" })}
              >
                <AddIcon />
              </Box>
            </CardMedia>
          </CardActionArea>
        </Card>
      )}
    </Stack>
  );
}

export default GradientPicker;
