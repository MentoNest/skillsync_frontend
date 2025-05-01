import { AuthHeaderProps } from "../../types/type";
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <article className="space-y-5 pb-8 flex flex-col">
      <h2 className="leading-9 text-[1.75rem] font-semibold">{title} </h2>
      <p className="text-lg font-normal leading-5 text-[#667085] ">
        {description}
      </p>
    </article>
  );
};
