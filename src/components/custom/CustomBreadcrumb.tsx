import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Link} from "react-router";

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

const CustomBreadcrumb = ({currentPage, breadcrumbs = []}: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link
                        to="/"
                        className="transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                {breadcrumbs.map((item, index) => (
                    <div key={index} className="contents">
                        <BreadcrumbItem>
                            <Link
                                to={item.to}
                                className="transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />
                    </div>
                ))}

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {currentPage}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;