interface ContainerProps {
  children: React.ReactNode;
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen px-[40px] xl:px-6 sm:px-4 mx-auto max-w-screen-4xl py-[24px] bg-main-bg dark:bg-dark-main-bg font-[body]">
      <div className="flex-grow">{children}</div>
    </div>
  );
};