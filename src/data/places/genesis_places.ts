export type PlaceConfidence = 'high' | 'medium' | 'low' | 'very_low' | 'unknown';

export type PlaceSourceRole =
  | 'primary_text_source'
  | 'lexical_source'
  | 'candidate_index'
  | 'verification_source'
  | 'interpretive_lead';

export type PlaceLocationStatus = 'identified' | 'candidate' | 'disputed' | 'unknown' | 'symbolic_possible';

export type PlaceSource = {
  title: string;
  url: string;
  role: PlaceSourceRole;
  note: string;
};

export type ModernPlaceCandidate = {
  name: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  confidence: PlaceConfidence;
  status: PlaceLocationStatus;
  note: string;
  sourceTitles: string[];
};

export type GenesisPlace = {
  id: string;
  koreanName: string;
  englishNames: string[];
  scholarlyForms: string[];
  originalLanguage: {
    hebrew: string | null;
    transliteration: string[];
    strong: string | null;
    glosses: string[];
  };
  references: string[];
  firstMention: string;
  biblicalLocationHint: string;
  narrativeMeaning: string;
  modernLocationStatus: PlaceLocationStatus;
  confidence: {
    originalMeaning: PlaceConfidence;
    biblicalContext: PlaceConfidence;
    modernCoordinates: PlaceConfidence;
  };
  modernCandidates: ModernPlaceCandidate[];
  researchNotes: string[];
  sources: PlaceSource[];
};

export const genesisPlaces: GenesisPlace[] = [
  {
    id: 'eden',
    koreanName: '에덴',
    englishNames: ['Eden', 'Garden of Eden'],
    scholarlyForms: ['Eden', 'ʿEden', '`Eden'],
    originalLanguage: {
      hebrew: 'עֵדֶן',
      transliteration: ['Eden', 'ʿEden'],
      strong: 'H5731',
      glosses: ['기쁨', '즐거움', '첫 인간 거처'],
    },
    references: ['창세기 2:8', '창세기 2:10', '창세기 2:15', '창세기 3:23-24', '창세기 4:16'],
    firstMention: '창세기 2:8',
    biblicalLocationHint: '창세기 2장은 동쪽의 에덴에 동산이 있었다고 말하고, 창세기 4:16은 놋을 에덴 동쪽의 기준점으로 사용한다.',
    narrativeMeaning:
      '창세기 4장에서는 가인의 이동 방향을 설명하는 기준점이다. 에덴 자체는 인간이 상실한 하나님의 임재와 생명 질서의 장소로 기능한다.',
    modernLocationStatus: 'disputed',
    confidence: {
      originalMeaning: 'medium',
      biblicalContext: 'high',
      modernCoordinates: 'very_low',
    },
    modernCandidates: [
      {
        name: '정확한 현대 위치 미상',
        region: '본문상 동방, 강 네 줄기 전승과 연결되나 지리 좌표 확정 불가',
        country: '미상',
        coordinates: null,
        confidence: 'very_low',
        status: 'unknown',
        note: '메소포타미아, 아르메니아, 페르시아만 부근 등 다양한 가설이 있으나 본문과 고대 지리 변화 때문에 확정하지 않는다.',
        sourceTitles: ['Strong H5731 Eden', 'Eden (Garden of) - Encyclopedia of The Bible', 'Ortsangaben im Buch Genesis - Eden'],
      },
    ],
    researchNotes: [
      '창세기 4장의 에덴은 놋의 위치를 산출하는 확정 좌표가 아니라 방향 기준점으로만 사용한다.',
      '에덴은 지리적 장소이면서 동시에 신학적/상징적 장소로 기능한다.',
      '앱에서는 현대 국가명으로 단정하지 않고 "위치 미상/논쟁 중"으로 표시한다.',
    ],
    sources: [
      {
        title: 'Strong H5731 Eden',
        url: 'https://studybible.info/strongs/H5731',
        role: 'lexical_source',
        note: '히브리어 표기, Strong 번호, 기본 의미와 위치 미상 정보를 확인하는 원어 사전 자료.',
      },
      {
        title: 'Eden (Garden of) - Encyclopedia of The Bible',
        url: 'https://www.biblegateway.com/resources/encyclopedia-of-the-bible/Eden-Garden',
        role: 'verification_source',
        note: '에덴 위치에 대한 주요 가설과 불확실성을 확인하는 참고 자료.',
      },
      {
        title: 'Ortsangaben im Buch Genesis - Eden',
        url: 'https://www.odb.bibelwissenschaft.de/ortsnamen/ortsname.php?n=26',
        role: 'verification_source',
        note: '에덴과 에덴 동산의 문학적/상징적 지리 가능성과 고대 명칭 자료를 확인하는 학술 지명 자료.',
      },
    ],
  },
  {
    id: 'nod',
    koreanName: '놋',
    englishNames: ['Nod', 'Land of Nod'],
    scholarlyForms: ['ʾereṣ-Nōḏ', 'Nowd', 'Nôd'],
    originalLanguage: {
      hebrew: 'אֶרֶץ־נוֹד',
      transliteration: ['Nod', 'Nowd', 'Nôd'],
      strong: 'H5113',
      glosses: ['방황', '유리함', '떠돎', '추방 상태'],
    },
    references: ['창세기 4:16'],
    firstMention: '창세기 4:16',
    biblicalLocationHint: '에덴 동쪽',
    narrativeMeaning:
      '가인이 아벨을 죽인 뒤 여호와 앞을 떠나 거주한 곳이다. 이름 자체가 창세기 4:12, 4:14의 유리함과 연결되어 지명과 상징 의미가 겹쳐진다.',
    modernLocationStatus: 'symbolic_possible',
    confidence: {
      originalMeaning: 'high',
      biblicalContext: 'high',
      modernCoordinates: 'very_low',
    },
    modernCandidates: [
      {
        name: '정확한 현대 위치 미상',
        region: '에덴 동쪽으로만 표현됨',
        country: '미상',
        coordinates: null,
        confidence: 'high',
        status: 'unknown',
        note: '본문은 에덴 동쪽이라는 방향 외에 좌표를 줄 만한 지리 단서를 제공하지 않는다.',
        sourceTitles: ['OpenBible - Nod', 'Bible Gateway Encyclopedia - Nod'],
      },
    ],
    researchNotes: [
      '현대 위치보다 원어 의미와 가인의 형벌/추방 상태를 먼저 해석해야 하는 지명이다.',
      '영어 관용구 land of Nod는 후대의 "잠의 나라" 의미와 섞이므로 성경 지리 데이터에서는 분리한다.',
      '고대 역본 및 초기 해석 전통에서는 방황뿐 아니라 떨림, 동요, 불안정 상태로 해석되는 갈래도 있다.',
    ],
    sources: [
      {
        title: 'BibleHub H5113 Nod',
        url: 'https://biblehub.com/hebrew/5113.htm',
        role: 'lexical_source',
        note: '히브리어 נוֹד, Strong H5113, 방황/유리함 계열 의미를 확인하는 원어 사전 자료.',
      },
      {
        title: 'Wikipedia - Land of Nod',
        url: 'https://en.wikipedia.org/wiki/Land_of_Nod',
        role: 'candidate_index',
        note: '영어권 해석 갈래와 초기 해석 전통을 파악하기 위한 후보 인덱스.',
      },
      {
        title: 'OpenBible - Nod',
        url: 'https://www.openbible.info/geo/ancient/a1ad8e1/nod',
        role: 'verification_source',
        note: '현대 위치를 unknown으로 분류하고, 특정 장소가 아닐 수 있음을 확인하는 지리 후보 자료.',
      },
      {
        title: 'Bible Gateway Encyclopedia - Nod',
        url: 'https://www.biblegateway.com/resources/encyclopedia-of-the-bible/Nod',
        role: 'verification_source',
        note: '에덴 동쪽이라는 본문 단서 외에는 위치를 알 수 없다는 점을 확인하는 백과 자료.',
      },
    ],
  },
  {
    id: 'enoch_city',
    koreanName: '에녹 성',
    englishNames: ['Enoch', 'City of Enoch'],
    scholarlyForms: ['Enoch', 'Henoch', 'Ḥanokh', 'Chanokh'],
    originalLanguage: {
      hebrew: 'חֲנוֹךְ',
      transliteration: ['Ḥanokh', 'Chanokh', 'Enoch'],
      strong: 'H2585',
      glosses: ['에녹', '봉헌됨', '시작됨', '훈련됨'],
    },
    references: ['창세기 4:17'],
    firstMention: '창세기 4:17',
    biblicalLocationHint: '놋 땅 이후 가인 계보 안에서 언급됨',
    narrativeMeaning:
      '가인이 아들 에녹의 이름을 따라 부른 도시다. 창세기 4장에서는 유리하는 자가 도시를 세우는 장면으로, 가인 계열의 정착과 문명화 흐름을 보여준다.',
    modernLocationStatus: 'unknown',
    confidence: {
      originalMeaning: 'medium',
      biblicalContext: 'high',
      modernCoordinates: 'very_low',
    },
    modernCandidates: [
      {
        name: '정확한 현대 위치 미상',
        region: '놋 땅과 연결되나 놋 자체가 위치 미상',
        country: '미상',
        coordinates: null,
        confidence: 'high',
        status: 'unknown',
        note: '창세기 4:17 외에는 도시 위치를 특정할 만한 본문 자료가 없다.',
        sourceTitles: ['Enoch (city) - Encyclopedia of The Bible'],
      },
      {
        name: 'Tell Abu Shahrain / Eridu',
        region: '남부 메소포타미아',
        country: '이라크',
        coordinates: {
          lat: 30.8167,
          lng: 46.0,
        },
        confidence: 'very_low',
        status: 'candidate',
        note: '일부 학술 논의에서 이랏/Irad 및 에리두 전승과 연결하는 가설이 있으나 본문 수정과 추정에 의존하므로 앱에서는 추측 후보로만 보관한다.',
        sourceTitles: ['Ortsangaben im Buch Genesis - Henoch'],
      },
    ],
    researchNotes: [
      '성읍 이름은 가인의 아들 에녹이라는 인명에서 온 문학적 명명으로 보는 것이 안전하다.',
      'Tell Abu Shahrain/Eridu 후보는 흥미로운 비교 지점이지만, 사용자 화면에서는 기본값으로 노출하지 않는 편이 낫다.',
      '가인 계보의 "도시, 목축, 음악, 금속" 흐름과 연결되는 문화사 데이터로 확장 가능하다.',
    ],
    sources: [
      {
        title: 'Genesis 4:17 Lexicon',
        url: 'https://biblehub.com/lexicon/genesis/4-17.htm',
        role: 'lexical_source',
        note: '에녹 성 관련 히브리어 인명과 city/town 표현을 확인하는 원어 분석 자료.',
      },
      {
        title: 'Enoch (city) - Encyclopedia of The Bible',
        url: 'https://www.biblegateway.com/resources/encyclopedia-of-the-bible/Enoch-city',
        role: 'verification_source',
        note: '창세기 4:17 외에는 이 도시 정보가 알려져 있지 않음을 확인하는 백과 자료.',
      },
      {
        title: 'Ortsangaben im Buch Genesis - Henoch',
        url: 'https://www.odg.bibelwissenschaft.de/ortsnamen/ortsname.php?n=52',
        role: 'verification_source',
        note: '에녹 성의 위치 제안 없음과 Tell Abu Shahrain/Eridu 가설의 낮은 확실도를 확인하는 학술 지명 자료.',
      },
    ],
  },
];

export const genesisPlaceById = Object.fromEntries(
  genesisPlaces.map((place) => [place.id, place]),
) as Record<string, GenesisPlace>;

