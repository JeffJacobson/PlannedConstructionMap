/**
 * Miscellaneous utilities
 */

export const formattedEpochRe = /\d{4}\/\d{2}\/\d{2}(?: \d{2}:\d{2} [AP]M)?/

/**
 * Formats an epoch.
 * 
 * @param epoch  - Epoch
 * @param isTime  - Indicates if the epoch is a time.
 * @returns epoch as a string. MM/DD/YYYY HH:mm  \{AM|PM\}
 */
export const formatEpoch = (epoch: number, isTime?: boolean): string => {
    /* IT said date will be in UTC, so removed the workaround below. If necessary simply
              change all the methods to UTC... methods. */
    /* The date value is in local time, so do not let JS do time conversion.
       By using the UTC... functions, we can get the date as is without conversion. */
    const date = new Date(epoch);
    let text = `${formatDateTimePart(date.getMonth() + 1)}/${formatDateTimePart(
        date.getDate()
    )}/${date.getFullYear()}`;
    if (isTime) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        // Check whether AM or PM
        const amOrPM = hours >= 12 ? "PM" : "AM";
        // Find current hour in AM-PM Format
        hours = hours % 12;
        // To display "0" as "12"
        hours = hours ? hours : 12;
        text += ` ${formatDateTimePart(hours)}:${formatDateTimePart(minutes)} ${amOrPM}`;
    }
    return text;
}

/**
 * Formats a number to be padded with zeros if only a single digit
 * 
 * @param part  - A number.
 * @returns A two-digit representation of the input number.
 */
const formatDateTimePart = (part: number) => {
    return ("0" + part).slice(-2);
};

/**
 * Fetches JSON from a URL.
 * 
 * @param url  - JSON URL
 * @param isUnicode  - Indicates if JSON is in utf-8 (true) or "windows-1252" (false);
 * @returns An object parsed from the JSON data.
 */
export const fetchJson = async (url: string, isUnicode?: boolean): Promise<unknown> => {
    const response = await fetch(url, { cache: "no-store" });
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`Fetch failed with code ${response.status}. URL: ${url}`);
    }
    let json: unknown;
    if (isUnicode) {
        json = await response.json();
    }
    else {
        const buffer = await response.arrayBuffer();
        /* I think the data is in Windows-1252 (or ISO-8859-1). 
           The method: response.json() by always encode everything in UTF-8, so that mess up some characters.
           To avoid this, decode the buffer with specific encoding instead. */
        const decoder = new TextDecoder('windows-1252');
        const text = decoder.decode(buffer);
        json = JSON.parse(text);
    }
    return json;
}

/**
 * Determines the media size
 *
 * @returns s: small, l:large (add more as needed);
 */
export const getMediaSize = (): "s" | "l" => {
    if (window.matchMedia("(max-width: 600px)").matches
        || window.matchMedia("(max-height: 400px)").matches) {
        return "s"
    }
    else {
        return "l"
    }
}

export const WebMercator = {
    "wkid": 3857
}
/**
 * Determines if the HTML element has a parent with a specific class.
 * 
 * @param child  - HTML element
 * @param classname  - CSS class name
 * @returns true or false indicating if the element's parent is in this class.
 */
export const hasParentClass = (child: Element | null, classname: string): boolean => {
    if (child) {
        // If the element is SVG, className is SVGAnimatedString object and throws an error on child.className.split().
        if (typeof child.className === "string" && child.className.split(' ').indexOf(classname) >= 0) return true;
        try {
            //Throws TypeError if child doesn't have parent any more
            return hasParentClass(child.parentNode as Element | null, classname);
        } catch (TypeError) {
            return false;
        }
    }
    else {
        return false
    }
}

/**
 * Determines if the HTML element has a parent with the given "id" attribute.
 * 
 * @param child  - An HTML element
 * @param id  - An "id" attribute value.
 * @returns a boolean indicating if the parent is present.
 */
export const hasParent = (child: HTMLElement, id: string): boolean => {
    if (child) {
        if (child.id === id) return true;
        try {
            //Throws TypeError if child doesn't have parent any more
            return hasParent(child.parentNode as HTMLElement, id);
        } catch (TypeError) {
            return false;
        }
    }
    else {
        return false
    }
}

/**
 * Generates a GUID
 * 
 * @returns a GUID
 */
export const getGuid = (): string => {
    // cspell: disable-next-line
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

