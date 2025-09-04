import Chip from "@mui/material/Chip";

type Props = {
  label?:string
};
const CategoryChip = ({ label}: Props) => {

  return (
    <Chip
      label={label}
      variant="filled"
      size="small"
      
      slotProps={{
        root:{
          sx:{
            width:"max-content",
            borderRadius:1
          }
        },
        label: {
          sx: {
            fontWeight: 600,
          },
        },
      }}
    />
  );
};

export default CategoryChip;
