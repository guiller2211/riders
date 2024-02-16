import { ColorUtils } from "../../../../../utils";
import { Badge, View } from "../../../../atomic";
import { BadgesProps } from "./Badges.types";

const Badges = (props: BadgesProps) => {
  return (
    <View gap={2} direction='row'>
      {
        props.badges?.map((badge, index) => {
          return (
            <View key={index}>
              <Badge
                attributes={{
                  style: {
                    color: 'var(--rs-color-white)',
                    background: ColorUtils.getBackgroundColor(badge.color),
                    borderColor: ColorUtils.getBackgroundColor(badge.color),
                  }
                }
              }>
                {badge.message}
              </Badge>
            </View>
          );
        })
      }
    </View>
  );
}
export default Badges;
