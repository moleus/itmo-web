export class ApiPaths {
    public static readonly LOGIN = "api/user/login";
    public static readonly REGISTER = "api/user/register";
    public static readonly HITS = "api/hits";
    public static readonly ADD_HIT = `${(this.HITS)}/add`;
}