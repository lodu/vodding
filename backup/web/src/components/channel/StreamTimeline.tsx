import { format } from "date-fns";

interface StreamTimelineItem {
  date: Date;
  title: string;
}

export interface StreamTimelineProps {
  items: StreamTimelineItem[];
}

function StreamTimeline({ items }: StreamTimelineProps) {
  return (
    <Timeline className="timeline timeline-vertical">
      {items.map((item, index) => (
        <Timeline.Item key={index} connect="both">
          <Timeline.Start>{format(item.date, "d MMM HH:mm")}</Timeline.Start>
          <Timeline.Middle />
          <Timeline.End>{item.title}</Timeline.End>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
export default StreamTimeline;
