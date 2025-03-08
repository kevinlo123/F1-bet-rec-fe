import Link from "next/link";
import Image from "next/image";
import { SectionTitleTwo } from "../../elements/sectionTitle/SectionTitle";
import { slugify } from "../../utils";

const CategoryList = () => {
  const filters = [
    { id: 1, cate: "News and updates", cate_img: "/images/category-images/new-updates.jpg" },
    { id: 2, cate: "Races and Events", cate_img: "/images/category-images/vegas.webp" },
    { id: 3, cate: "Lifestyle and culture", cate_img: "/images/category-images/lifestyle.jpeg" },
    { id: 4, cate: "Beyond the grid", cate_img: "/images/category-images/beyond.jpg" },
    { id: 5, cate: "History and Legacy", cate_img: "/images/category-images/history.jpg" },
  ];

  return (
    <div className="axil-categories-list axil-section-gap bg-color-grey">
      <div className="container">
        <SectionTitleTwo title="Categories" />
        <div className="row">
          <div className="col-lg-12">
            <div className="list-categories d-flex flex-wrap">
              {filters.map((data) => (
                <div className="single-cat" key={data.id}>
                  <div className="inner">
                    <Link href={`/category/${slugify(data.cate)}`} legacyBehavior>
                      <a>
                        <div className="thumbnail">
                          <Image src={data.cate_img} alt={data.cate} height={180} width={180} />
                        </div>
                        <div className="content">
                          <h5 className="title">{data.cate}</h5>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
