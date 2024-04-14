
export function slugValidation(slug, blogSlugs,portfolioSlugs) {


    if (slug === '') {
        return 'Slug cannot be empty';
    }
    if (slug.length < 3) {
        return 'Slug must be at least 3 characters long';
    }
    if (slug.length > 50) {
        return 'Slug must be less than 50 characters long';
    }
    if (blogSlugs.includes(slug) || portfolioSlugs.includes(slug)) {
        return 'Slug already exists';
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
        return 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    return null;
}