import { Image, Box } from "@skynexui/components";
export default function PagNotFound() {
  return (
    <>
      <Box
        styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
      >
        <Image
          styleSheet={{
            borderRadius: "50%",
            marginBottom: "3px",
            maxWidth: "1000px",
            align: "center",
          }}
          alt="Página não encontrada"
          src="404.jpg"
        />
      </Box>
    </>
  );
}
