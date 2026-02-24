import Image, { StaticImageData } from "next/image";
import doc from "../../public/docs.png";
import downloadIcon from "../../public/download.png";
function ToolsTemplates() {
  return (
    <div className="flex flex-col w-full items-start gap-4">
      <div>
        <p className="text-black font-semibold text-[24px] leading-[32px]">
          ToolsTemplates
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 w-full">
        <TemplateCard
          borderColor="border-[#E2E8F0]"
          bg="bg-[#DBEAFE]"
          buttonbg="bg-[#155DFC]"
          imageUrl={downloadIcon}
        />
        <TemplateCard
          borderColor="border-[#E2E8F0]"
          bg="bg-[#F3E8FF]"
          buttonbg="bg-[#9810FA]"
          imageUrl={doc}
        />
      </div>
    </div>
  );
}

export default ToolsTemplates;

const TemplateCard = ({
  borderColor,
  bg,
  buttonbg,
  imageUrl,
}: {
  borderColor: string;
  bg: string;
  buttonbg: string;
  imageUrl: StaticImageData;
}) => {
  return (
    <div
      className={`w-full  max-w-[604px] rounded-[12px] ${bg} gap-2 flex justify-between flex-col h-[229.45px] border-[0.73px] ${borderColor} p-[32px]`}
    >
      <div>
        <Image
          src={imageUrl}
          alt=""
          width={32}
          height={32}
          className="w-[32px] h-[32px]"
        />
      </div>
      <div>
        <p className="leading-[28px] font-inter font-semibold text-lg ">
          Resume Builder
        </p>
        <p className="font-inter text-base leading-[24px] text-[#4A5565] font-normal ">
          Create professional resumes with our easy-to-use templates
        </p>
      </div>

      <button
        className={`w-[114px] text-white h-[40px] rounded-[10px] ${buttonbg}`}
      >
        Button
      </button>
    </div>
  );
};
