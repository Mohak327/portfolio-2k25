import type { TitledCardListProps } from "./TitledCardList.interface";
import Card from "../../Molecules/Card/Card.view";
import { Terminal } from "lucide-react";
import ConditionLinkView from "@/components/Molecules/ConditionLink/ConditionLink.view";

const TitledCardList = <
  T extends {
    link: string | undefined;
    accent?: string;
    bgColor?: string;
    /** Explicit override for whether the card responds to clicks; defaults to !!link. */
    interactive?: boolean;
  }
>({
  title,
  items,
  renderItem,
  icon,
  colCount = 1,
  timeline = false,
}: TitledCardListProps<T>) => {
  return (
    <div className={`flex flex-col gap-6 ${timeline ? "relative" : ""}`}>
      <div className="flex items-center gap-6">
        <div className="bg-black text-white p-2 border-2 border-black">
          {icon || <Terminal size={24} />}
        </div>
        <h2 className="text-4xl font-black uppercase">{title}</h2>
      </div>
      {timeline && items.length > 0 && (
        <div className="absolute left-[8px] top-[22px] h-[80px] w-1 bg-black" />
      )}
      {timeline ? (
        <div className="relative pl-8 md:pl-10">
          <div className="flex flex-col gap-8">
            {items.map((item, index) => {
              const isInteractive = item.interactive ?? !!item.link;
              return (
                <div key={index} className="relative">
                  {index < items.length - 1 && (
                    <div className="absolute -left-6 md:-left-8 top-[34px] bottom-[-66px] w-1 bg-black" />
                  )}
                  {/* Left edge sits on the dot; right edge runs 2px past the card's resting
                      edge (hidden underneath it, since the Card paints on top) so that when
                      the Card presses down 2px on hover, the two stay flush with no gap and
                      no animation needed on the stub itself. */}
                  <div
                    className={`absolute top-[32px] -left-[12px] md:-left-[20px] ${
                      isInteractive ? "w-[14px] md:w-[22px]" : "w-[12px] md:w-[20px]"
                    } h-1 bg-black`}
                  />
                  <div
                    style={{ backgroundColor: item.accent ? item.accent : "white" }}
                    className="absolute -left-8 md:-left-10 top-6 w-5 h-5 rounded-full border-4 border-black z-10"
                  />
                  <ConditionLinkView link={item.link}>
                    <Card
                      bgColor={item.bgColor ? item.bgColor : "white"}
                      accentColor={item.accent ? item.accent : "white"}
                      interactive={isInteractive}
                    >
                      {renderItem(item, index)}
                    </Card>
                  </ConditionLinkView>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
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
                  interactive={item.interactive ?? !!item.link}
                >
                  {renderItem(item, index)}
                </Card>
              </ConditionLinkView>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitledCardList;
