import * as React from 'react';
import { TrackType, useAnimation, useTimeline } from '../../contexts';
import './TimelineKeyframeView.scss';

interface TimelineKeyframeViewProps {
  trackType: TrackType;
  trackUuid: string;
  keyframeUuid: string;
  x: number;
}

export const TimelineKeyframeView: React.FC<TimelineKeyframeViewProps> = props => {
  const animation = useAnimation();
  const timeline = useTimeline();

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      timeline.setSelectedTrackUuid(props.trackUuid);
      timeline.setSelectedKeyframeUuid(props.keyframeUuid);
    },
    [
      props.trackUuid,
      props.keyframeUuid,
      timeline.setSelectedTrackUuid,
      timeline.setSelectedKeyframeUuid,
    ]
  );

  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      animation.eraseKeyframe(props.trackUuid, props.keyframeUuid);
    },
    [props.trackUuid, props.keyframeUuid, animation.eraseKeyframe]
  );

  const active = React.useMemo(
    () => props.keyframeUuid === timeline.selectedKeyframeUuid,
    [props.keyframeUuid, timeline.selectedKeyframeUuid]
  );

  return (
    <div
      className={'timeline-keyframe__mark' + (active ? '--active' : '')}
      style={{ left: props.x }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};
