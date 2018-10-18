import { Quote } from "../data/quote.interface";


// The class holds all marked favorites
export class QuoteServices {

    private favoriteQuotes: Quote[] = [];

    addQuoteToFavorites(quote: Quote) {
        // add element into an array => push
        this.favoriteQuotes.push(quote);

        console.log(this.favoriteQuotes);
    }

    // Each Quote has its own identifying id
    // .findIndex(): Returns the index of the first element in the array where predicate is true, and -1 otherwise.
    // 箭头=>函数相当于匿名函数
    removeQuoteFavorites(quote: Quote) {
        const position = this.favoriteQuotes.findIndex((quoteElement: Quote) => {
            return quoteElement.id == quote.id;
        });

        // 1: one element will be removed
        this.favoriteQuotes.splice(position, 1);
    }

    // .slice(): Returns a section of an array.
    // here is to copy the whole array
    getFavoriteQuotes() {
        return this.favoriteQuotes.slice();
    }

    isQuoteFavorite(quote: Quote) {
        return this.favoriteQuotes.find((quoteElement: Quote) => {
            return quoteElement.id == quote.id;
        });
    }
}