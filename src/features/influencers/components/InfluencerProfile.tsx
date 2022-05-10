import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { useParams } from "react-router-dom";

export const InfluencerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { influencers } = useDatabaseContext();
  const currentUser = React.useMemo(
    () => influencers?.find(({ userId }) => userId.toString() === id),
    [id, influencers]
  );
  return <>WASSUP {currentUser?.user}</>;
};
