
import { createRef, useRef } from "react";
import { Header, Icon, Input } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default function BlogSearch() {
    const { blogStore: { loadBlogsSearch } } = useStore();
    const searchRef = useRef<any>();

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log(searchRef.current.value());
            // if (searchRef.current) {
            //     loadBlogsSearch(searchRef.current.value());
            // }
        }
    }

    return (
        <>
            <Header as='h4' content='SEARCH' />
            <div className="search-wrap">


                <input
                    className="search-input"
                    ref={searchRef}
                    onKeyDown={handleKeyDown}
                />
                <Icon
                    className="search-icon"
                    onClick={() => { console.log("soikratis") }}
                    name='search' inverted circular link
                />
            </div>
        </>
    )
}