import { Image, Box } from "@skynexui/components";
export default function PagNotFound() {
  return (
    <>
      <Box
        styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",        
            
        }}
      >
        <Image          
          alt="Página não encontrada"
          src="404.jpg"
        />
      </Box>
    </>
  );
}