import { Comparator } from "../filterEnums";

const equality = [Comparator.Equal, Comparator.NotEqual];
const fillStatus = [Comparator.Blank, Comparator.NotBlank];
const includes = [Comparator.Contains, Comparator.NotContains];
const affix = [Comparator.StartsWith, Comparator.EndsWith];
const inequality_simple = [Comparator.GreaterThan, Comparator.LessThan]
const inequality_complex = [Comparator.GreaterThanOrEqual, Comparator.LessThanOrEqual];
const inequality_all = [...inequality_simple, ...inequality_complex];
const base = [...equality, ...fillStatus];
const text = [...base, ...includes, ...affix];
const boolean = [Comparator.Equal];
const number = [...base, ...inequality_all, Comparator.InRange];
const date = [...base, ...inequality_simple, Comparator.InRange];
const datetime = [...base, ...inequality_simple, Comparator.InRange];
const list = [Comparator.ListContains, Comparator.IsListEmpty, Comparator.IsListNotEmpty];

export const ComparatorPackages = {
    base,
    text,
    number,
    date,
    datetime,
    boolean,
    list
}
