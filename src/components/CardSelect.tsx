import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

type CardSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  options: { id: string; title: string; description: string }[];
};

function CardSelect<TFieldValues extends FieldValues>({
  options,
  control,
  name,
}: CardSelectProps<TFieldValues>) {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {options.map(({ id, title, description }) => (
        <Card key={id} variant="outlined">
          <CardActionArea
            onClick={() => field.onChange(id)}
            data-active={field.value === id ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}

export default CardSelect;
