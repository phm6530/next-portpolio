import { BASE_URL } from "@/config/base";
const imgUrlMapper = ({ thumbnail }: { thumbnail: string }) => {
  return /^(https?:)?\/\//.test(thumbnail)
    ? thumbnail
    : `${BASE_URL}/${thumbnail}`;
};

export default imgUrlMapper;
