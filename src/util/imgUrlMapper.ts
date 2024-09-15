const imgUrlMapper = ({ thumbnail }: { thumbnail: string }) => {
  return /^(https?:)?\/\//.test(thumbnail)
    ? thumbnail
    : `${process.env.NEXT_PUBLIC_BASE_URL}/${thumbnail}`;
};

export default imgUrlMapper;
