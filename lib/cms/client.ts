const CMS_BASE_URL =
  process.env.CMS_API_BASE_URL ??
  "https://2gns9fe744.execute-api.ap-south-1.amazonaws.com/api";

interface CmsResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface CmsGetOptions {
  revalidate?: number;
  tags?: string[];
}

export async function cmsGet<T>(
  path: string,
  params?: Record<string, string>,
  options: CmsGetOptions = {},
): Promise<T | null> {
  const url = new URL(`${CMS_BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const {
    revalidate = 86400, // fallback: 24 hours
    tags = [],
  } = options;

  try {
    // const res = await fetch(url.toString(), {
    //   next: {
    //     revalidate,
    //     tags: ["cms", ...tags],
    //   },
    // });
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `[CMS] ${res.status} ${res.statusText} — ${url}`,
      );

      return null;
    }

    const json: CmsResponse<T> = await res.json();

    if (!json.success || !json.data) {
      console.error(
        `[CMS] API returned success=false — ${url}`,
        json.message,
      );

      return null;
    }

    return json.data;
  } catch (err) {
    console.error(`[CMS] fetch failed — ${url}`, err);
    return null;
  }
}