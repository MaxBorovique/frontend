interface Props {
  handler: () => void;
  buttonText: string,
}
export const AddButton: React.FC<Props> = ({buttonText, handler}) => {
  return (
    <button onClick={handler} className="py-[10px] rounded-x px-4 text-xl bg-primary hover:bg-primary-hover font-title text-cards-bg"><span className="flex items-center justify-center before:bg-[url('/plus.svg')] before:bg-no-repeat before:bg-center before:w-4 before:h-4 gap-2">{buttonText}</span></button>
  )
}