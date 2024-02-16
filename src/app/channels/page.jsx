import ChannelsComponents from "@/components/ChannelsComponents";
import { getChannels } from "@/lib/actions/user"


const page = async ({searchParams}) => {
    const channels = await getChannels(searchParams.channelName || '');
   
    return (
        <section className='min-h-[100vh] py-8 px-8'>
            <ChannelsComponents channels={channels}/>
        </section>
    )
}

export default page