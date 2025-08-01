import Dialog from "@/components/base/Dialog";
import LoadComponent from "@/components/base/LoadComponent/LoadComponent";
import { UseDialog } from "@/hooks/useDialog";
import { CreateCategorySchema } from "@/schema/category.schema";
import { UseMutation } from "ezhooks/lib/useMutation";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

type Props = {
  dialog: UseDialog;
  mutation: UseMutation<CreateCategorySchema>;
  isPending?: boolean;
  onSubmit: () => void;
};

const Form = ({ dialog, mutation, isPending, onSubmit }: Props) => {
  const { setData, value } = mutation;
  return (
    <Dialog
      open={dialog.open}
      draggable
      title={"Form Kategori"}
      maxWidth="xs"
      fullWidth
      actionButton={[
        { text: "Batal", onClick: dialog.closeDialog },
        { text: "Tambah Kategori", variant: "text", onClick: onSubmit },
      ]}
      ContentProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          gap: 3,
        },
      }}
    >
      <Fade in={mutation.loading || isPending} unmountOnExit>
        <div>
          <em>{mutation.loading ? "Mengambil data...": isPending ? "Memuat Data" : ""}</em>
        </div>
      </Fade>

      <TextField
        label="Kategori"
        placeholder="Masukkan nama kategori"
        fullWidth
        required
        value={value("name", "")}
        onChange={(e) => setData({ name: e.target.value })}
      />

      <TextField
        label="Slug"
        placeholder="Masukkan slug"
        fullWidth
        required
        value={value("slug", "")}
        onChange={(e) => setData({ slug: e.target.value })}
      />
    </Dialog>
  );
};

export default Form;
