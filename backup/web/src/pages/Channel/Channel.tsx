import TwitchUserService from "../../services/TwitchUserService";
import { useRequiredParams } from "../../helpers";
import { VoddingTwitchUser } from "@vodding/common/chatTypes";
import { useState, useEffect } from "react";
import ErrorExplained from "../Error/ErrorExplained";

import { FetchError } from "@/fetchInstance";
import { Alert, Spinner } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

function Profile() {
  const { channelName } = useRequiredParams<{ channelName: string }>();
  const [user, setUser] = useState<VoddingTwitchUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError>();

  useEffect(() => {
    const fetchUser = async () => {
      TwitchUserService.getUserByName(channelName)
        .then((user) => {
          setUser(user);
        })
        .catch((error: FetchError) => {
          setError(error);
        });
    };
    setIsLoading(true);
    fetchUser();
    setIsLoading(false);
  }, [channelName]);

  return (
    <DefaultLayout>
      <Alert description={"sdd"} title={"title"} />
      {error && (
        <ErrorExplained
          title={"Error fetching user"}
          body={error.message}
          // redirectPath="/"
        />
      )}
      {isLoading && <Spinner />}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {/* <h1 className={title()}>About</h1> */}
        </div>
      </section>
      {/* <Avatar src={user.profilePictureUrl} alt={user.displayName} />

      <Chat channelName={channelName} /> */}
    </DefaultLayout>
  );
}

export default Profile;
