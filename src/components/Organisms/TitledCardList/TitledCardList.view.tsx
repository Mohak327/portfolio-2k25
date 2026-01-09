import type { TitledCardListProps } from "./TitledCardList.interface";
import Card from "../../Molecules/Card/Card.view";
import { Terminal } from "lucide-react";
import ConditionLinkView from "@/components/Molecules/ConditionLink/ConditionLink.view";

const TitledCardList = <
  T extends {
    link: string | undefined;
    accent?: string;
    bgColor?: string;
  }
>({
  title,
  items,
  renderItem,
  icon,
  colCount = 1,
}: TitledCardListProps<T>) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="bg-black text-white p-2 border-2 border-black">
          {icon || <Terminal size={24} />}
        </div>
        <h2 className="text-4xl font-black uppercase">{title}</h2>
      </div>
      <div
        className="[column-count:1] md:[column-count:var(--col-count)]"
        style={{ "--col-count": colCount } as React.CSSProperties}
      >
        {items.map((item, index) => (
          <div key={index} className="break-inside-avoid mb-6">
            <ConditionLinkView link={item.link}>
              <Card
                bgColor={item.bgColor ? item.bgColor : "white"}
                accentColor={item.accent ? item.accent : "white"}
              >
                {renderItem(item)}
              </Card>
            </ConditionLinkView>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitledCardList;
