require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1867:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
const fs_jetpack_1 = __importDefault(__nccwpck_require__(4610));
const path_1 = __importDefault(__nccwpck_require__(1017));
const exec_1 = __nccwpck_require__(6780);
class JSPackageManagerInterop {
    constructor(extensionRoot, packageManager, jsDirectory) {
        var _a;
        this.oneTimeSetupComplete = false;
        this.extensionRoot = extensionRoot !== null && extensionRoot !== void 0 ? extensionRoot : './';
        this.packageManager = packageManager !== null && packageManager !== void 0 ? packageManager : core.getInput('package_manager', { required: true });
        this.jsDirectory = (_a = jsDirectory !== null && jsDirectory !== void 0 ? jsDirectory : core.getInput('js_path', { required: true })) !== null && _a !== void 0 ? _a : './js';
        this.pathToJsFolder = path_1.default.resolve(fs_jetpack_1.default.cwd(), fs_jetpack_1.default.path(this.extensionRoot, this.jsDirectory));
        this.validatePackageManager();
    }
    /**
     * Installs all JS dependencies for this extension using the
     * manager's lockfile.
     *
     * If the lockfile is not up-to-date, this task will fail.
     */
    installJsDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            this.performOneTimeSetup();
            switch (this.packageManager) {
                case 'yarn':
                    yield this.exec(['install', '--frozen-lockfile']);
                    break;
                case 'pnpm':
                    yield this.exec(['install', '--frozen-lockfile']);
                    break;
                case 'npm':
                    yield this.exec(['ci']);
                    break;
            }
        });
    }
    /**
     * Runs the provided `package.json` script, with the provided
     * arguments.
     *
     * @param script Name of the `package.json` script to run.
     * @param options Any options to pass to the script.
     */
    runPackageScript(script, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.performOneTimeSetup();
            switch (this.packageManager) {
                case 'yarn':
                case 'pnpm':
                case 'npm':
                    yield this.exec(['run', script, ...(options !== null && options !== void 0 ? options : [])]);
                    break;
            }
        });
    }
    /**
     * If not already completed, performs any one-time setup to support
     * a package manager.
     *
     * For example, this might include the setting of flags or config
     * options inside the package manager, or installing a thirs-party
     * package manager.
     */
    performOneTimeSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.oneTimeSetupComplete)
                return;
            switch (this.packageManager) {
                case 'pnpm':
                    yield (0, exec_1.exec)('npm', ['install', '--global', 'pnpm'], {});
                    break;
            }
            this.oneTimeSetupComplete = true;
        });
    }
    /**
     * Ensures that the provided package manager is supported by this
     * interop module.
     */
    validatePackageManager() {
        if (!JSPackageManagerInterop.SupportedPackageManagers.includes(this.packageManager)) {
            throw new Error(`Unsupported package manager: ${this.packageManager}`);
        }
    }
    /**
     * Executes a JS package manager command from the root of the
     * extension's JS folder.
     */
    exec(options) {
        return (0, exec_1.exec)(this.packageManager, options, { cwd: this.pathToJsFolder });
    }
}
exports["default"] = JSPackageManagerInterop;
JSPackageManagerInterop.SupportedPackageManagers = ['yarn', 'npm', 'pnpm'];


/***/ }),

/***/ 2098:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asyncArrayFilter = void 0;
/**
 * Equivalent to `Array.prototype.filter`, but works with asynchronous predicates.
 */
function asyncArrayFilter(arr, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Promise.all(arr.map(predicate));
        return arr.filter((_v, index) => results[index]);
    });
}
exports.asyncArrayFilter = asyncArrayFilter;
// Typescript-ified from source: https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/


/***/ }),

/***/ 6780:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exec = void 0;
// @ts-expect-error
const promise_spawn_1 = __importDefault(__nccwpck_require__(7905));
function exec(cmd, args, opts = {}, extra) {
    return (0, promise_spawn_1.default)(cmd, args, Object.assign(Object.assign({}, opts), { stdio: 'inherit' }), extra);
}
exports.exec = exec;


/***/ }),

/***/ 3844:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Installs JS dependencies using the selected package manager.
 */
function installJsDependencies(packageManager) {
    return __awaiter(this, void 0, void 0, function* () {
        yield packageManager.installJsDependencies();
    });
}
exports["default"] = installJsDependencies;


/***/ }),

/***/ 6458:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
/**
 * Runs JS build script using the selected package manager.
 */
function runBuildScript(packageManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildScript = core.getInput('build_script', { required: true });
        yield packageManager.runPackageScript(buildScript);
    });
}
exports["default"] = runBuildScript;


/***/ }),

/***/ 3024:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
/**
 * Runs build typings script using the selected package manager, if the feature
 * is enabled.
 */
function runBuildTypingsScript(packageManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildTypingsScript = core.getInput('typings_script');
        if (buildTypingsScript === '')
            return;
        yield packageManager.runPackageScript(buildTypingsScript);
    });
}
exports["default"] = runBuildTypingsScript;


/***/ }),

/***/ 5768:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
/**
 * Runs JS formatting checker script from `package.json`, if the feature
 * is enabled.
 */
function runFormatCheckScript(packageManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkFormattingScript = core.getInput('format_script');
        if (checkFormattingScript === '')
            return;
        yield packageManager.runPackageScript(checkFormattingScript);
    });
}
exports["default"] = runFormatCheckScript;


/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
const handleFlarumMonorepo_1 = __nccwpck_require__(366);
const runCiJobs_1 = __importDefault(__nccwpck_require__(1468));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // If this is a monorepo, handle it separately, else continue
            if (yield (0, handleFlarumMonorepo_1.handleFlarumMonorepo)())
                return;
            yield (0, runCiJobs_1.default)();
        }
        catch (error) {
            if (error instanceof Error || typeof error === 'string')
                core.setFailed(error);
            else
                core.setFailed(JSON.stringify(error));
        }
    });
}
run();


/***/ }),

/***/ 366:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleFlarumMonorepo = void 0;
const fs_jetpack_1 = __importDefault(__nccwpck_require__(4610));
const asyncFilter_1 = __nccwpck_require__(2098);
const runCiJobs_1 = __importDefault(__nccwpck_require__(1468));
const isDirectoryFlarumExtension_1 = __importDefault(__nccwpck_require__(5130));
/**
 * Detects if there is a `flarum-monorepo.json` file in the repository root.
 *
 * If so, it will iterate over the extensions defined in the file, if present,
 * and run the appropriate CI jobs for each asynchronously.
 *
 * Returns `true` if the repo has a `flarum-monorepo.json` file and this file
 * has handled JS actions, `false` otherwise.
 */
function handleFlarumMonorepo() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const monorepoJson = yield fs_jetpack_1.default.readAsync('flarum-monorepo.json', 'json');
        // `undefined` means the file was not found
        if (monorepoJson === undefined)
            return false;
        const repositories = (_b = (_a = monorepoJson.packages.extensions) === null || _a === void 0 ? void 0 : _a.map((extension) => (Object.assign(Object.assign({}, extension), { pathToDir: `./extensions/${extension.name}` })))) !== null && _b !== void 0 ? _b : [];
        // Special case for core
        if (monorepoJson.packages.core) {
            repositories.push(Object.assign(Object.assign({}, monorepoJson.packages.core), { pathToDir: './framework/core' }));
        }
        if (repositories.length === 0)
            return false;
        const filteredRepositories = yield (0, asyncFilter_1.asyncArrayFilter)(repositories, (repository) => __awaiter(this, void 0, void 0, function* () { return yield (0, isDirectoryFlarumExtension_1.default)(repository.pathToDir); }));
        if (filteredRepositories.length === 0)
            return false;
        // Run the CI jobs for each repository in parallel and wait for completion
        yield Promise.all(filteredRepositories.map((repository) => (0, runCiJobs_1.default)(repository.pathToDir)));
        return true;
    });
}
exports.handleFlarumMonorepo = handleFlarumMonorepo;


/***/ }),

/***/ 5130:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_jetpack_1 = __importDefault(__nccwpck_require__(4610));
function isDirectoryFlarumExtension(pathFromRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const composerJson = yield fs_jetpack_1.default.readAsync(`${pathFromRoot}/composer.json`, 'json');
        if (composerJson === undefined)
            return false;
        if (composerJson.type === 'flarum-extension')
            return true;
        // Special case for monorepo
        if (composerJson.name === 'flarum/core')
            return true;
        return false;
    });
}
exports["default"] = isDirectoryFlarumExtension;


/***/ }),

/***/ 1468:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_jetpack_1 = __importDefault(__nccwpck_require__(4610));
const JSPackageManagerInterop_1 = __importDefault(__nccwpck_require__(1867));
const installJsDependencies_1 = __importDefault(__nccwpck_require__(3844));
const runBuildScript_1 = __importDefault(__nccwpck_require__(6458));
const runBuildTypingsScript_1 = __importDefault(__nccwpck_require__(3024));
const runFormatCheckScript_1 = __importDefault(__nccwpck_require__(5768));
/**
 * Automatically detect and run the appropriate CI jobs for the current repository.
 *
 * Pass a custom path as the first parameter to run the CI jobs for a specific
 * subdirectory of the repository (useful for monorepo).
 */
function runCiJobs(path = './') {
    return __awaiter(this, void 0, void 0, function* () {
        const jp = fs_jetpack_1.default.cwd(path);
        const pm = new JSPackageManagerInterop_1.default(path);
        yield (0, installJsDependencies_1.default)(pm);
        yield (0, runFormatCheckScript_1.default)(pm);
        yield (0, runBuildTypingsScript_1.default)(pm);
        yield (0, runBuildScript_1.default)(pm);
    });
}
exports["default"] = runCiJobs;


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(8041);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 8041:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(9925);
const auth_1 = __nccwpck_require__(3702);
const core_1 = __nccwpck_require__(2186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 9925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(3685);
const https = __nccwpck_require__(5687);
const pm = __nccwpck_require__(6443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(4294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 6443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 7905:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { spawn } = __nccwpck_require__(2081)
const inferOwner = __nccwpck_require__(5476)

const isPipe = (stdio = 'pipe', fd) =>
  stdio === 'pipe' || stdio === null ? true
  : Array.isArray(stdio) ? isPipe(stdio[fd], fd)
  : false

// 'extra' object is for decorating the error a bit more
const promiseSpawn = (cmd, args, opts = {}, extra = {}) => {
  const cwd = opts.cwd || process.cwd()
  const isRoot = process.getuid && process.getuid() === 0
  const { uid, gid } = isRoot ? inferOwner.sync(cwd) : {}
  return promiseSpawnUid(cmd, args, {
    ...opts,
    cwd,
    uid,
    gid,
  }, extra)
}

const stdioResult = (stdout, stderr, { stdioString, stdio }) =>
  stdioString ? {
    stdout: isPipe(stdio, 1) ? Buffer.concat(stdout).toString() : null,
    stderr: isPipe(stdio, 2) ? Buffer.concat(stderr).toString() : null,
  }
  : {
    stdout: isPipe(stdio, 1) ? Buffer.concat(stdout) : null,
    stderr: isPipe(stdio, 2) ? Buffer.concat(stderr) : null,
  }

const promiseSpawnUid = (cmd, args, opts, extra) => {
  let proc
  const p = new Promise((res, rej) => {
    proc = spawn(cmd, args, opts)
    const stdout = []
    const stderr = []
    const reject = er => rej(Object.assign(er, {
      cmd,
      args,
      ...stdioResult(stdout, stderr, opts),
      ...extra,
    }))
    proc.on('error', reject)
    if (proc.stdout) {
      proc.stdout.on('data', c => stdout.push(c)).on('error', reject)
      proc.stdout.on('error', er => reject(er))
    }
    if (proc.stderr) {
      proc.stderr.on('data', c => stderr.push(c)).on('error', reject)
      proc.stderr.on('error', er => reject(er))
    }
    proc.on('close', (code, signal) => {
      const result = {
        cmd,
        args,
        code,
        signal,
        ...stdioResult(stdout, stderr, opts),
        ...extra,
      }
      if (code || signal) {
        rej(Object.assign(new Error('command failed'), result))
      } else {
        res(result)
      }
    })
  })

  p.stdin = proc.stdin
  p.process = proc
  return p
}

module.exports = promiseSpawn


/***/ }),

/***/ 9417:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 3717:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var concatMap = __nccwpck_require__(6891);
var balanced = __nccwpck_require__(9417);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 6891:
/***/ ((module) => {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 573:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(130);
const write = __nccwpck_require__(5234);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, path, data, options) => {
  const methodSignature = `${methodName}(path, data, [options])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.argument(methodSignature, "data", data, ["string", "buffer"]);
  validate.options(methodSignature, "options", options, {
    mode: ["string", "number"]
  });
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const appendSync = (path, data, options) => {
  try {
    fs.appendFileSync(path, data, options);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Parent directory doesn't exist, so just pass the task to `write`,
      // which will create the folder and file.
      write.sync(path, data, options);
    } else {
      throw err;
    }
  }
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const appendAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, options)
      .then(resolve)
      .catch(err => {
        if (err.code === "ENOENT") {
          // Parent directory doesn't exist, so just pass the task to `write`,
          // which will create the folder and file.
          write.async(path, data, options).then(resolve, reject);
        } else {
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = appendSync;
exports.async = appendAsync;


/***/ }),

/***/ 6592:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const fs = __nccwpck_require__(130);
const dir = __nccwpck_require__(9665);
const exists = __nccwpck_require__(8091);
const inspect = __nccwpck_require__(7628);
const write = __nccwpck_require__(5234);
const matcher = __nccwpck_require__(3386);
const fileMode = __nccwpck_require__(7386);
const treeWalker = __nccwpck_require__(365);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, from, to, options) => {
  const methodSignature = `${methodName}(from, to, [options])`;
  validate.argument(methodSignature, "from", from, ["string"]);
  validate.argument(methodSignature, "to", to, ["string"]);
  validate.options(methodSignature, "options", options, {
    overwrite: ["boolean", "function"],
    matching: ["string", "array of string"],
    ignoreCase: ["boolean"]
  });
};

const parseOptions = (options, from) => {
  const opts = options || {};
  const parsedOptions = {};

  if (opts.ignoreCase === undefined) {
    opts.ignoreCase = false;
  }

  parsedOptions.overwrite = opts.overwrite;

  if (opts.matching) {
    parsedOptions.allowedToCopy = matcher.create(
      from,
      opts.matching,
      opts.ignoreCase
    );
  } else {
    parsedOptions.allowedToCopy = () => {
      // Default behaviour - copy everything.
      return true;
    };
  }

  return parsedOptions;
};

const generateNoSourceError = path => {
  const err = new Error(`Path to copy doesn't exist ${path}`);
  err.code = "ENOENT";
  return err;
};

const generateDestinationExistsError = path => {
  const err = new Error(`Destination path already exists ${path}`);
  err.code = "EEXIST";
  return err;
};

const inspectOptions = {
  mode: true,
  symlinks: "report",
  times: true,
  absolutePath: true
};

const shouldThrowDestinationExistsError = context => {
  return (
    typeof context.opts.overwrite !== "function" &&
    context.opts.overwrite !== true
  );
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const checksBeforeCopyingSync = (from, to, opts) => {
  if (!exists.sync(from)) {
    throw generateNoSourceError(from);
  }

  if (exists.sync(to) && !opts.overwrite) {
    throw generateDestinationExistsError(to);
  }
};

const canOverwriteItSync = context => {
  if (typeof context.opts.overwrite === "function") {
    const destInspectData = inspect.sync(context.destPath, inspectOptions);
    return context.opts.overwrite(context.srcInspectData, destInspectData);
  }
  return context.opts.overwrite === true;
};

const copyFileSync = (srcPath, destPath, mode, context) => {
  const data = fs.readFileSync(srcPath);
  try {
    fs.writeFileSync(destPath, data, { mode, flag: "wx" });
  } catch (err) {
    if (err.code === "ENOENT") {
      write.sync(destPath, data, { mode });
    } else if (err.code === "EEXIST") {
      if (canOverwriteItSync(context)) {
        fs.writeFileSync(destPath, data, { mode });
      } else if (shouldThrowDestinationExistsError(context)) {
        throw generateDestinationExistsError(context.destPath);
      }
    } else {
      throw err;
    }
  }
};

const copySymlinkSync = (from, to) => {
  const symlinkPointsAt = fs.readlinkSync(from);
  try {
    fs.symlinkSync(symlinkPointsAt, to);
  } catch (err) {
    // There is already file/symlink with this name on destination location.
    // Must erase it manually, otherwise system won't allow us to place symlink there.
    if (err.code === "EEXIST") {
      fs.unlinkSync(to);
      // Retry...
      fs.symlinkSync(symlinkPointsAt, to);
    } else {
      throw err;
    }
  }
};

const copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
  const context = { srcPath, destPath, srcInspectData, opts };
  const mode = fileMode.normalizeFileMode(srcInspectData.mode);
  if (srcInspectData.type === "dir") {
    dir.createSync(destPath, { mode });
  } else if (srcInspectData.type === "file") {
    copyFileSync(srcPath, destPath, mode, context);
  } else if (srcInspectData.type === "symlink") {
    copySymlinkSync(srcPath, destPath);
  }
};

const copySync = (from, to, options) => {
  const opts = parseOptions(options, from);

  checksBeforeCopyingSync(from, to, opts);

  treeWalker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
    const rel = pathUtil.relative(from, srcPath);
    const destPath = pathUtil.resolve(to, rel);
    if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
      copyItemSync(srcPath, srcInspectData, destPath, opts);
    }
  });
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const checksBeforeCopyingAsync = (from, to, opts) => {
  return exists
    .async(from)
    .then(srcPathExists => {
      if (!srcPathExists) {
        throw generateNoSourceError(from);
      } else {
        return exists.async(to);
      }
    })
    .then(destPathExists => {
      if (destPathExists && !opts.overwrite) {
        throw generateDestinationExistsError(to);
      }
    });
};

const canOverwriteItAsync = context => {
  return new Promise((resolve, reject) => {
    if (typeof context.opts.overwrite === "function") {
      inspect
        .async(context.destPath, inspectOptions)
        .then(destInspectData => {
          resolve(
            context.opts.overwrite(context.srcInspectData, destInspectData)
          );
        })
        .catch(reject);
    } else {
      resolve(context.opts.overwrite === true);
    }
  });
};

const copyFileAsync = (srcPath, destPath, mode, context, runOptions) => {
  return new Promise((resolve, reject) => {
    const runOpts = runOptions || {};

    let flags = "wx";
    if (runOpts.overwrite) {
      flags = "w";
    }

    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath, { mode, flags });

    readStream.on("error", reject);

    writeStream.on("error", err => {
      // Force read stream to close, since write stream errored
      // read stream serves us no purpose.
      readStream.resume();

      if (err.code === "ENOENT") {
        // Some parent directory doesn't exits. Create it and retry.
        dir
          .createAsync(pathUtil.dirname(destPath))
          .then(() => {
            copyFileAsync(srcPath, destPath, mode, context).then(
              resolve,
              reject
            );
          })
          .catch(reject);
      } else if (err.code === "EEXIST") {
        canOverwriteItAsync(context)
          .then(canOverwite => {
            if (canOverwite) {
              copyFileAsync(srcPath, destPath, mode, context, {
                overwrite: true
              }).then(resolve, reject);
            } else if (shouldThrowDestinationExistsError(context)) {
              reject(generateDestinationExistsError(destPath));
            } else {
              resolve();
            }
          })
          .catch(reject);
      } else {
        reject(err);
      }
    });

    writeStream.on("finish", resolve);

    readStream.pipe(writeStream);
  });
};

const copySymlinkAsync = (from, to) => {
  return fs.readlink(from).then(symlinkPointsAt => {
    return new Promise((resolve, reject) => {
      fs.symlink(symlinkPointsAt, to)
        .then(resolve)
        .catch(err => {
          if (err.code === "EEXIST") {
            // There is already file/symlink with this name on destination location.
            // Must erase it manually, otherwise system won't allow us to place symlink there.
            fs.unlink(to)
              .then(() => {
                // Retry...
                return fs.symlink(symlinkPointsAt, to);
              })
              .then(resolve, reject);
          } else {
            reject(err);
          }
        });
    });
  });
};

const copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
  const context = { srcPath, destPath, srcInspectData, opts };
  const mode = fileMode.normalizeFileMode(srcInspectData.mode);
  if (srcInspectData.type === "dir") {
    return dir.createAsync(destPath, { mode });
  } else if (srcInspectData.type === "file") {
    return copyFileAsync(srcPath, destPath, mode, context);
  } else if (srcInspectData.type === "symlink") {
    return copySymlinkAsync(srcPath, destPath);
  }
  // Ha! This is none of supported file system entities. What now?
  // Just continuing without actually copying sounds sane.
  return Promise.resolve();
};

const copyAsync = (from, to, options) => {
  return new Promise((resolve, reject) => {
    const opts = parseOptions(options, from);

    checksBeforeCopyingAsync(from, to, opts)
      .then(() => {
        let allFilesDelivered = false;
        let filesInProgress = 0;

        treeWalker.async(
          from,
          { inspectOptions },
          (srcPath, item) => {
            if (item) {
              const rel = pathUtil.relative(from, srcPath);
              const destPath = pathUtil.resolve(to, rel);
              if (opts.allowedToCopy(srcPath, item, destPath)) {
                filesInProgress += 1;
                copyItemAsync(srcPath, item, destPath, opts)
                  .then(() => {
                    filesInProgress -= 1;
                    if (allFilesDelivered && filesInProgress === 0) {
                      resolve();
                    }
                  })
                  .catch(reject);
              }
            }
          },
          err => {
            if (err) {
              reject(err);
            } else {
              allFilesDelivered = true;
              if (allFilesDelivered && filesInProgress === 0) {
                resolve();
              }
            }
          }
        );
      })
      .catch(reject);
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = copySync;
exports.async = copyAsync;


/***/ }),

/***/ 9665:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const fs = __nccwpck_require__(130);
const modeUtil = __nccwpck_require__(7386);
const validate = __nccwpck_require__(7006);
const remove = __nccwpck_require__(1584);

const validateInput = (methodName, path, criteria) => {
  const methodSignature = `${methodName}(path, [criteria])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.options(methodSignature, "criteria", criteria, {
    empty: ["boolean"],
    mode: ["string", "number"]
  });
};

const getCriteriaDefaults = passedCriteria => {
  const criteria = passedCriteria || {};
  if (typeof criteria.empty !== "boolean") {
    criteria.empty = false;
  }
  if (criteria.mode !== undefined) {
    criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
  }
  return criteria;
};

const generatePathOccupiedByNotDirectoryError = path => {
  return new Error(
    `Path ${path} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`
  );
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathSync = path => {
  let stat;

  try {
    stat = fs.statSync(path);
  } catch (err) {
    // Detection if path already exists
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  if (stat && !stat.isDirectory()) {
    throw generatePathOccupiedByNotDirectoryError(path);
  }

  return stat;
};

const createBrandNewDirectorySync = (path, opts) => {
  const options = opts || {};

  try {
    fs.mkdirSync(path, options.mode);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Parent directory doesn't exist. Need to create it first.
      createBrandNewDirectorySync(pathUtil.dirname(path), options);
      // Now retry creating this directory.
      fs.mkdirSync(path, options.mode);
    } else if (err.code === "EEXIST") {
      // The path already exists. We're fine.
    } else {
      throw err;
    }
  }
};

const checkExistingDirectoryFulfillsCriteriaSync = (path, stat, criteria) => {
  const checkMode = () => {
    const mode = modeUtil.normalizeFileMode(stat.mode);
    if (criteria.mode !== undefined && criteria.mode !== mode) {
      fs.chmodSync(path, criteria.mode);
    }
  };

  const checkEmptiness = () => {
    if (criteria.empty) {
      // Delete everything inside this directory
      const list = fs.readdirSync(path);
      list.forEach(filename => {
        remove.sync(pathUtil.resolve(path, filename));
      });
    }
  };

  checkMode();
  checkEmptiness();
};

const dirSync = (path, passedCriteria) => {
  const criteria = getCriteriaDefaults(passedCriteria);
  const stat = checkWhatAlreadyOccupiesPathSync(path);
  if (stat) {
    checkExistingDirectoryFulfillsCriteriaSync(path, stat, criteria);
  } else {
    createBrandNewDirectorySync(path, criteria);
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathAsync = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path)
      .then(stat => {
        if (stat.isDirectory()) {
          resolve(stat);
        } else {
          reject(generatePathOccupiedByNotDirectoryError(path));
        }
      })
      .catch(err => {
        if (err.code === "ENOENT") {
          // Path doesn't exist
          resolve(undefined);
        } else {
          // This is other error that nonexistent path, so end here.
          reject(err);
        }
      });
  });
};

// Delete all files and directores inside given directory
const emptyAsync = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path)
      .then(list => {
        const doOne = index => {
          if (index === list.length) {
            resolve();
          } else {
            const subPath = pathUtil.resolve(path, list[index]);
            remove.async(subPath).then(() => {
              doOne(index + 1);
            });
          }
        };

        doOne(0);
      })
      .catch(reject);
  });
};

const checkExistingDirectoryFulfillsCriteriaAsync = (path, stat, criteria) => {
  return new Promise((resolve, reject) => {
    const checkMode = () => {
      const mode = modeUtil.normalizeFileMode(stat.mode);
      if (criteria.mode !== undefined && criteria.mode !== mode) {
        return fs.chmod(path, criteria.mode);
      }
      return Promise.resolve();
    };

    const checkEmptiness = () => {
      if (criteria.empty) {
        return emptyAsync(path);
      }
      return Promise.resolve();
    };

    checkMode()
      .then(checkEmptiness)
      .then(resolve, reject);
  });
};

const createBrandNewDirectoryAsync = (path, opts) => {
  const options = opts || {};

  return new Promise((resolve, reject) => {
    fs.mkdir(path, options.mode)
      .then(resolve)
      .catch(err => {
        if (err.code === "ENOENT") {
          // Parent directory doesn't exist. Need to create it first.
          createBrandNewDirectoryAsync(pathUtil.dirname(path), options)
            .then(() => {
              // Now retry creating this directory.
              return fs.mkdir(path, options.mode);
            })
            .then(resolve)
            .catch(err2 => {
              if (err2.code === "EEXIST") {
                // Hmm, something other have already created the directory?
                // No problem for us.
                resolve();
              } else {
                reject(err2);
              }
            });
        } else if (err.code === "EEXIST") {
          // The path already exists. We're fine.
          resolve();
        } else {
          reject(err);
        }
      });
  });
};

const dirAsync = (path, passedCriteria) => {
  return new Promise((resolve, reject) => {
    const criteria = getCriteriaDefaults(passedCriteria);

    checkWhatAlreadyOccupiesPathAsync(path)
      .then(stat => {
        if (stat !== undefined) {
          return checkExistingDirectoryFulfillsCriteriaAsync(
            path,
            stat,
            criteria
          );
        }
        return createBrandNewDirectoryAsync(path, criteria);
      })
      .then(resolve, reject);
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = dirSync;
exports.createSync = createBrandNewDirectorySync;
exports.async = dirAsync;
exports.createAsync = createBrandNewDirectoryAsync;


/***/ }),

/***/ 8091:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, path) => {
  const methodSignature = `${methodName}(path)`;
  validate.argument(methodSignature, "path", path, ["string"]);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const existsSync = path => {
  try {
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      return "dir";
    } else if (stat.isFile()) {
      return "file";
    }
    return "other";
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  return false;
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const existsAsync = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path)
      .then(stat => {
        if (stat.isDirectory()) {
          resolve("dir");
        } else if (stat.isFile()) {
          resolve("file");
        } else {
          resolve("other");
        }
      })
      .catch(err => {
        if (err.code === "ENOENT") {
          resolve(false);
        } else {
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = existsSync;
exports.async = existsAsync;


/***/ }),

/***/ 4960:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(130);
const modeUtil = __nccwpck_require__(7386);
const validate = __nccwpck_require__(7006);
const write = __nccwpck_require__(5234);

const validateInput = (methodName, path, criteria) => {
  const methodSignature = `${methodName}(path, [criteria])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.options(methodSignature, "criteria", criteria, {
    content: ["string", "buffer", "object", "array"],
    jsonIndent: ["number"],
    mode: ["string", "number"]
  });
};

const getCriteriaDefaults = passedCriteria => {
  const criteria = passedCriteria || {};
  if (criteria.mode !== undefined) {
    criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
  }
  return criteria;
};

const generatePathOccupiedByNotFileError = path => {
  return new Error(
    `Path ${path} exists but is not a file. Halting jetpack.file() call for safety reasons.`
  );
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathSync = path => {
  let stat;

  try {
    stat = fs.statSync(path);
  } catch (err) {
    // Detection if path exists
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  if (stat && !stat.isFile()) {
    throw generatePathOccupiedByNotFileError(path);
  }

  return stat;
};

const checkExistingFileFulfillsCriteriaSync = (path, stat, criteria) => {
  const mode = modeUtil.normalizeFileMode(stat.mode);

  const checkContent = () => {
    if (criteria.content !== undefined) {
      write.sync(path, criteria.content, {
        mode,
        jsonIndent: criteria.jsonIndent
      });
      return true;
    }
    return false;
  };

  const checkMode = () => {
    if (criteria.mode !== undefined && criteria.mode !== mode) {
      fs.chmodSync(path, criteria.mode);
    }
  };

  const contentReplaced = checkContent();
  if (!contentReplaced) {
    checkMode();
  }
};

const createBrandNewFileSync = (path, criteria) => {
  let content = "";
  if (criteria.content !== undefined) {
    content = criteria.content;
  }
  write.sync(path, content, {
    mode: criteria.mode,
    jsonIndent: criteria.jsonIndent
  });
};

const fileSync = (path, passedCriteria) => {
  const criteria = getCriteriaDefaults(passedCriteria);
  const stat = checkWhatAlreadyOccupiesPathSync(path);
  if (stat !== undefined) {
    checkExistingFileFulfillsCriteriaSync(path, stat, criteria);
  } else {
    createBrandNewFileSync(path, criteria);
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathAsync = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path)
      .then(stat => {
        if (stat.isFile()) {
          resolve(stat);
        } else {
          reject(generatePathOccupiedByNotFileError(path));
        }
      })
      .catch(err => {
        if (err.code === "ENOENT") {
          // Path doesn't exist.
          resolve(undefined);
        } else {
          // This is other error. Must end here.
          reject(err);
        }
      });
  });
};

const checkExistingFileFulfillsCriteriaAsync = (path, stat, criteria) => {
  const mode = modeUtil.normalizeFileMode(stat.mode);

  const checkContent = () => {
    return new Promise((resolve, reject) => {
      if (criteria.content !== undefined) {
        write
          .async(path, criteria.content, {
            mode,
            jsonIndent: criteria.jsonIndent
          })
          .then(() => {
            resolve(true);
          })
          .catch(reject);
      } else {
        resolve(false);
      }
    });
  };

  const checkMode = () => {
    if (criteria.mode !== undefined && criteria.mode !== mode) {
      return fs.chmod(path, criteria.mode);
    }
    return undefined;
  };

  return checkContent().then(contentReplaced => {
    if (!contentReplaced) {
      return checkMode();
    }
    return undefined;
  });
};

const createBrandNewFileAsync = (path, criteria) => {
  let content = "";
  if (criteria.content !== undefined) {
    content = criteria.content;
  }

  return write.async(path, content, {
    mode: criteria.mode,
    jsonIndent: criteria.jsonIndent
  });
};

const fileAsync = (path, passedCriteria) => {
  return new Promise((resolve, reject) => {
    const criteria = getCriteriaDefaults(passedCriteria);

    checkWhatAlreadyOccupiesPathAsync(path)
      .then(stat => {
        if (stat !== undefined) {
          return checkExistingFileFulfillsCriteriaAsync(path, stat, criteria);
        }
        return createBrandNewFileAsync(path, criteria);
      })
      .then(resolve, reject);
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = fileSync;
exports.async = fileAsync;


/***/ }),

/***/ 8008:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const treeWalker = __nccwpck_require__(365);
const inspect = __nccwpck_require__(7628);
const matcher = __nccwpck_require__(3386);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, path, options) => {
  const methodSignature = `${methodName}([path], options)`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.options(methodSignature, "options", options, {
    matching: ["string", "array of string"],
    filter: ["function"],
    files: ["boolean"],
    directories: ["boolean"],
    recursive: ["boolean"],
    ignoreCase: ["boolean"]
  });
};

const normalizeOptions = options => {
  const opts = options || {};
  // defaults:
  if (opts.matching === undefined) {
    opts.matching = "*";
  }
  if (opts.files === undefined) {
    opts.files = true;
  }
  if (opts.ignoreCase === undefined) {
    opts.ignoreCase = false;
  }
  if (opts.directories === undefined) {
    opts.directories = false;
  }
  if (opts.recursive === undefined) {
    opts.recursive = true;
  }
  return opts;
};

const processFoundPaths = (foundPaths, cwd) => {
  return foundPaths.map(path => {
    return pathUtil.relative(cwd, path);
  });
};

const generatePathDoesntExistError = path => {
  const err = new Error(`Path you want to find stuff in doesn't exist ${path}`);
  err.code = "ENOENT";
  return err;
};

const generatePathNotDirectoryError = path => {
  const err = new Error(
    `Path you want to find stuff in must be a directory ${path}`
  );
  err.code = "ENOTDIR";
  return err;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const findSync = (path, options) => {
  const foundAbsolutePaths = [];
  const matchesAnyOfGlobs = matcher.create(
    path,
    options.matching,
    options.ignoreCase
  );

  let maxLevelsDeep = Infinity;
  if (options.recursive === false) {
    maxLevelsDeep = 1;
  }

  treeWalker.sync(
    path,
    { maxLevelsDeep, symlinks: "follow", inspectOptions: { times: true } },
    (itemPath, item) => {
      if (item && itemPath !== path && matchesAnyOfGlobs(itemPath)) {
        const weHaveMatch =
          (item.type === "file" && options.files === true) ||
          (item.type === "dir" && options.directories === true);

        if (weHaveMatch) {
          if (options.filter) {
            const passedThroughFilter = options.filter(item);
            if (passedThroughFilter) {
              foundAbsolutePaths.push(itemPath);
            }
          } else {
            foundAbsolutePaths.push(itemPath);
          }
        }
      }
    }
  );

  foundAbsolutePaths.sort();

  return processFoundPaths(foundAbsolutePaths, options.cwd);
};

const findSyncInit = (path, options) => {
  const entryPointInspect = inspect.sync(path, { symlinks: "follow" });
  if (entryPointInspect === undefined) {
    throw generatePathDoesntExistError(path);
  } else if (entryPointInspect.type !== "dir") {
    throw generatePathNotDirectoryError(path);
  }

  return findSync(path, normalizeOptions(options));
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const findAsync = (path, options) => {
  return new Promise((resolve, reject) => {
    const foundAbsolutePaths = [];
    const matchesAnyOfGlobs = matcher.create(
      path,
      options.matching,
      options.ignoreCase
    );

    let maxLevelsDeep = Infinity;
    if (options.recursive === false) {
      maxLevelsDeep = 1;
    }

    let waitingForFiltersToFinish = 0;
    let treeWalkerDone = false;

    const maybeDone = () => {
      if (treeWalkerDone && waitingForFiltersToFinish === 0) {
        foundAbsolutePaths.sort();
        resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
      }
    };

    treeWalker.async(
      path,
      { maxLevelsDeep, symlinks: "follow", inspectOptions: { times: true } },
      (itemPath, item) => {
        if (item && itemPath !== path && matchesAnyOfGlobs(itemPath)) {
          const weHaveMatch =
            (item.type === "file" && options.files === true) ||
            (item.type === "dir" && options.directories === true);

          if (weHaveMatch) {
            if (options.filter) {
              const passedThroughFilter = options.filter(item);
              const isPromise = typeof passedThroughFilter.then === "function";
              if (isPromise) {
                waitingForFiltersToFinish += 1;
                passedThroughFilter
                  .then(passedThroughFilterResult => {
                    if (passedThroughFilterResult) {
                      foundAbsolutePaths.push(itemPath);
                    }
                    waitingForFiltersToFinish -= 1;
                    maybeDone();
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else if (passedThroughFilter) {
                foundAbsolutePaths.push(itemPath);
              }
            } else {
              foundAbsolutePaths.push(itemPath);
            }
          }
        }
      },
      err => {
        if (err) {
          reject(err);
        } else {
          treeWalkerDone = true;
          maybeDone();
        }
      }
    );
  });
};

const findAsyncInit = (path, options) => {
  return inspect.async(path, { symlinks: "follow" }).then(entryPointInspect => {
    if (entryPointInspect === undefined) {
      throw generatePathDoesntExistError(path);
    } else if (entryPointInspect.type !== "dir") {
      throw generatePathNotDirectoryError(path);
    }
    return findAsync(path, normalizeOptions(options));
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = findSyncInit;
exports.async = findAsyncInit;


/***/ }),

/***/ 7628:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const crypto = __nccwpck_require__(6113);
const pathUtil = __nccwpck_require__(1017);
const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);

const supportedChecksumAlgorithms = ["md5", "sha1", "sha256", "sha512"];

const symlinkOptions = ["report", "follow"];

const validateInput = (methodName, path, options) => {
  const methodSignature = `${methodName}(path, [options])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.options(methodSignature, "options", options, {
    checksum: ["string"],
    mode: ["boolean"],
    times: ["boolean"],
    absolutePath: ["boolean"],
    symlinks: ["string"]
  });

  if (
    options &&
    options.checksum !== undefined &&
    supportedChecksumAlgorithms.indexOf(options.checksum) === -1
  ) {
    throw new Error(
      `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(
        ", "
      )}`
    );
  }

  if (
    options &&
    options.symlinks !== undefined &&
    symlinkOptions.indexOf(options.symlinks) === -1
  ) {
    throw new Error(
      `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(
        ", "
      )}`
    );
  }
};

const createInspectObj = (path, options, stat) => {
  const obj = {};

  obj.name = pathUtil.basename(path);

  if (stat.isFile()) {
    obj.type = "file";
    obj.size = stat.size;
  } else if (stat.isDirectory()) {
    obj.type = "dir";
  } else if (stat.isSymbolicLink()) {
    obj.type = "symlink";
  } else {
    obj.type = "other";
  }

  if (options.mode) {
    obj.mode = stat.mode;
  }

  if (options.times) {
    obj.accessTime = stat.atime;
    obj.modifyTime = stat.mtime;
    obj.changeTime = stat.ctime;
  }

  if (options.absolutePath) {
    obj.absolutePath = path;
  }

  return obj;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const fileChecksum = (path, algo) => {
  const hash = crypto.createHash(algo);
  const data = fs.readFileSync(path);
  hash.update(data);
  return hash.digest("hex");
};

const addExtraFieldsSync = (path, inspectObj, options) => {
  if (inspectObj.type === "file" && options.checksum) {
    inspectObj[options.checksum] = fileChecksum(path, options.checksum);
  } else if (inspectObj.type === "symlink") {
    inspectObj.pointsAt = fs.readlinkSync(path);
  }
};

const inspectSync = (path, options) => {
  let statOperation = fs.lstatSync;
  let stat;
  const opts = options || {};

  if (opts.symlinks === "follow") {
    statOperation = fs.statSync;
  }

  try {
    stat = statOperation(path);
  } catch (err) {
    // Detection if path exists
    if (err.code === "ENOENT") {
      // Doesn't exist. Return undefined instead of throwing.
      return undefined;
    }
    throw err;
  }

  const inspectObj = createInspectObj(path, opts, stat);
  addExtraFieldsSync(path, inspectObj, opts);

  return inspectObj;
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const fileChecksumAsync = (path, algo) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algo);
    const s = fs.createReadStream(path);
    s.on("data", data => {
      hash.update(data);
    });
    s.on("end", () => {
      resolve(hash.digest("hex"));
    });
    s.on("error", reject);
  });
};

const addExtraFieldsAsync = (path, inspectObj, options) => {
  if (inspectObj.type === "file" && options.checksum) {
    return fileChecksumAsync(path, options.checksum).then(checksum => {
      inspectObj[options.checksum] = checksum;
      return inspectObj;
    });
  } else if (inspectObj.type === "symlink") {
    return fs.readlink(path).then(linkPath => {
      inspectObj.pointsAt = linkPath;
      return inspectObj;
    });
  }
  return Promise.resolve(inspectObj);
};

const inspectAsync = (path, options) => {
  return new Promise((resolve, reject) => {
    let statOperation = fs.lstat;
    const opts = options || {};

    if (opts.symlinks === "follow") {
      statOperation = fs.stat;
    }

    statOperation(path)
      .then(stat => {
        const inspectObj = createInspectObj(path, opts, stat);
        addExtraFieldsAsync(path, inspectObj, opts).then(resolve, reject);
      })
      .catch(err => {
        // Detection if path exists
        if (err.code === "ENOENT") {
          // Doesn't exist. Return undefined instead of throwing.
          resolve(undefined);
        } else {
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
exports.symlinkOptions = symlinkOptions;
exports.validateInput = validateInput;
exports.sync = inspectSync;
exports.async = inspectAsync;


/***/ }),

/***/ 190:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const crypto = __nccwpck_require__(6113);
const pathUtil = __nccwpck_require__(1017);
const inspect = __nccwpck_require__(7628);
const list = __nccwpck_require__(3796);
const validate = __nccwpck_require__(7006);
const treeWalker = __nccwpck_require__(365);

const validateInput = (methodName, path, options) => {
  const methodSignature = `${methodName}(path, [options])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.options(methodSignature, "options", options, {
    checksum: ["string"],
    relativePath: ["boolean"],
    times: ["boolean"],
    symlinks: ["string"]
  });

  if (
    options &&
    options.checksum !== undefined &&
    inspect.supportedChecksumAlgorithms.indexOf(options.checksum) === -1
  ) {
    throw new Error(
      `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect.supportedChecksumAlgorithms.join(
        ", "
      )}`
    );
  }

  if (
    options &&
    options.symlinks !== undefined &&
    inspect.symlinkOptions.indexOf(options.symlinks) === -1
  ) {
    throw new Error(
      `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect.symlinkOptions.join(
        ", "
      )}`
    );
  }
};

const relativePathInTree = (parentInspectObj, inspectObj) => {
  if (parentInspectObj === undefined) {
    return ".";
  }
  return parentInspectObj.relativePath + "/" + inspectObj.name;
};

// Creates checksum of a directory by using
// checksums and names of all its children.
const checksumOfDir = (inspectList, algo) => {
  const hash = crypto.createHash(algo);
  inspectList.forEach(inspectObj => {
    hash.update(inspectObj.name + inspectObj[algo]);
  });
  return hash.digest("hex");
};

const calculateTreeDependentProperties = (
  parentInspectObj,
  inspectObj,
  options
) => {
  if (options.relativePath) {
    inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
  }

  if (inspectObj.type === "dir") {
    inspectObj.children.forEach(childInspectObj => {
      calculateTreeDependentProperties(inspectObj, childInspectObj, options);
    });

    inspectObj.size = 0;
    inspectObj.children.sort((a, b) => {
      if (a.type === "dir" && b.type === "file") {
        return -1;
      }
      if (a.type === "file" && b.type === "dir") {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    inspectObj.children.forEach(child => {
      inspectObj.size += child.size || 0;
    });

    if (options.checksum) {
      inspectObj[options.checksum] = checksumOfDir(
        inspectObj.children,
        options.checksum
      );
    }
  }
};

const findParentInTree = (treeNode, pathChain, item) => {
  const name = pathChain[0];
  if (pathChain.length > 1) {
    const itemInTreeForPathChain = treeNode.children.find(child => {
      return child.name === name;
    });
    return findParentInTree(itemInTreeForPathChain, pathChain.slice(1), item);
  }
  return treeNode;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const inspectTreeSync = (path, opts) => {
  const options = opts || {};
  let tree;

  treeWalker.sync(path, { inspectOptions: options }, (itemPath, item) => {
    if (item) {
      if (item.type === "dir") {
        item.children = [];
      }
      const relativePath = pathUtil.relative(path, itemPath);
      if (relativePath === "") {
        tree = item;
      } else {
        const parentItem = findParentInTree(
          tree,
          relativePath.split(pathUtil.sep),
          item
        );
        parentItem.children.push(item);
      }
    }
  });

  if (tree) {
    calculateTreeDependentProperties(undefined, tree, options);
  }

  return tree;
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const inspectTreeAsync = (path, opts) => {
  const options = opts || {};
  let tree;

  return new Promise((resolve, reject) => {
    treeWalker.async(
      path,
      { inspectOptions: options },
      (itemPath, item) => {
        if (item) {
          if (item.type === "dir") {
            item.children = [];
          }
          const relativePath = pathUtil.relative(path, itemPath);
          if (relativePath === "") {
            tree = item;
          } else {
            const parentItem = findParentInTree(
              tree,
              relativePath.split(pathUtil.sep),
              item
            );
            parentItem.children.push(item);
          }
        }
      },
      err => {
        if (err) {
          reject(err);
        } else {
          if (tree) {
            calculateTreeDependentProperties(undefined, tree, options);
          }
          resolve(tree);
        }
      }
    );
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = inspectTreeSync;
exports.async = inspectTreeAsync;


/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(3837);
const pathUtil = __nccwpck_require__(1017);
const append = __nccwpck_require__(573);
const dir = __nccwpck_require__(9665);
const file = __nccwpck_require__(4960);
const find = __nccwpck_require__(8008);
const inspect = __nccwpck_require__(7628);
const inspectTree = __nccwpck_require__(190);
const copy = __nccwpck_require__(6592);
const exists = __nccwpck_require__(8091);
const list = __nccwpck_require__(3796);
const move = __nccwpck_require__(685);
const read = __nccwpck_require__(3534);
const remove = __nccwpck_require__(1584);
const rename = __nccwpck_require__(3151);
const symlink = __nccwpck_require__(7618);
const streams = __nccwpck_require__(4335);
const tmpDir = __nccwpck_require__(5747);
const write = __nccwpck_require__(5234);

// The Jetpack Context object.
// It provides the public API, and resolves all paths regarding to
// passed cwdPath, or default process.cwd() if cwdPath was not specified.
const jetpackContext = cwdPath => {
  const getCwdPath = () => {
    return cwdPath || process.cwd();
  };

  const cwd = function() {
    // return current CWD if no arguments specified...
    if (arguments.length === 0) {
      return getCwdPath();
    }

    // ...create new CWD context otherwise
    const args = Array.prototype.slice.call(arguments);
    const pathParts = [getCwdPath()].concat(args);
    return jetpackContext(pathUtil.resolve.apply(null, pathParts));
  };

  // resolves path to inner CWD path of this jetpack instance
  const resolvePath = path => {
    return pathUtil.resolve(getCwdPath(), path);
  };

  const getPath = function() {
    // add CWD base path as first element of arguments array
    Array.prototype.unshift.call(arguments, getCwdPath());
    return pathUtil.resolve.apply(null, arguments);
  };

  const normalizeOptions = options => {
    const opts = options || {};
    opts.cwd = getCwdPath();
    return opts;
  };

  // API

  const api = {
    cwd,
    path: getPath,

    append: (path, data, options) => {
      append.validateInput("append", path, data, options);
      append.sync(resolvePath(path), data, options);
    },
    appendAsync: (path, data, options) => {
      append.validateInput("appendAsync", path, data, options);
      return append.async(resolvePath(path), data, options);
    },

    copy: (from, to, options) => {
      copy.validateInput("copy", from, to, options);
      copy.sync(resolvePath(from), resolvePath(to), options);
    },
    copyAsync: (from, to, options) => {
      copy.validateInput("copyAsync", from, to, options);
      return copy.async(resolvePath(from), resolvePath(to), options);
    },

    createWriteStream: (path, options) => {
      return streams.createWriteStream(resolvePath(path), options);
    },
    createReadStream: (path, options) => {
      return streams.createReadStream(resolvePath(path), options);
    },

    dir: (path, criteria) => {
      dir.validateInput("dir", path, criteria);
      const normalizedPath = resolvePath(path);
      dir.sync(normalizedPath, criteria);
      return cwd(normalizedPath);
    },
    dirAsync: (path, criteria) => {
      dir.validateInput("dirAsync", path, criteria);
      return new Promise((resolve, reject) => {
        const normalizedPath = resolvePath(path);
        dir.async(normalizedPath, criteria).then(() => {
          resolve(cwd(normalizedPath));
        }, reject);
      });
    },

    exists: path => {
      exists.validateInput("exists", path);
      return exists.sync(resolvePath(path));
    },
    existsAsync: path => {
      exists.validateInput("existsAsync", path);
      return exists.async(resolvePath(path));
    },

    file: (path, criteria) => {
      file.validateInput("file", path, criteria);
      file.sync(resolvePath(path), criteria);
      return api;
    },
    fileAsync: (path, criteria) => {
      file.validateInput("fileAsync", path, criteria);
      return new Promise((resolve, reject) => {
        file.async(resolvePath(path), criteria).then(() => {
          resolve(api);
        }, reject);
      });
    },

    find: (startPath, options) => {
      // startPath is optional parameter, if not specified move rest of params
      // to proper places and default startPath to CWD.
      if (typeof options === "undefined" && typeof startPath === "object") {
        options = startPath;
        startPath = ".";
      }
      find.validateInput("find", startPath, options);
      return find.sync(resolvePath(startPath), normalizeOptions(options));
    },
    findAsync: (startPath, options) => {
      // startPath is optional parameter, if not specified move rest of params
      // to proper places and default startPath to CWD.
      if (typeof options === "undefined" && typeof startPath === "object") {
        options = startPath;
        startPath = ".";
      }
      find.validateInput("findAsync", startPath, options);
      return find.async(resolvePath(startPath), normalizeOptions(options));
    },

    inspect: (path, fieldsToInclude) => {
      inspect.validateInput("inspect", path, fieldsToInclude);
      return inspect.sync(resolvePath(path), fieldsToInclude);
    },
    inspectAsync: (path, fieldsToInclude) => {
      inspect.validateInput("inspectAsync", path, fieldsToInclude);
      return inspect.async(resolvePath(path), fieldsToInclude);
    },

    inspectTree: (path, options) => {
      inspectTree.validateInput("inspectTree", path, options);
      return inspectTree.sync(resolvePath(path), options);
    },
    inspectTreeAsync: (path, options) => {
      inspectTree.validateInput("inspectTreeAsync", path, options);
      return inspectTree.async(resolvePath(path), options);
    },

    list: path => {
      list.validateInput("list", path);
      return list.sync(resolvePath(path || "."));
    },
    listAsync: path => {
      list.validateInput("listAsync", path);
      return list.async(resolvePath(path || "."));
    },

    move: (from, to, options) => {
      move.validateInput("move", from, to, options);
      move.sync(resolvePath(from), resolvePath(to), options);
    },
    moveAsync: (from, to, options) => {
      move.validateInput("moveAsync", from, to, options);
      return move.async(resolvePath(from), resolvePath(to), options);
    },

    read: (path, returnAs) => {
      read.validateInput("read", path, returnAs);
      return read.sync(resolvePath(path), returnAs);
    },
    readAsync: (path, returnAs) => {
      read.validateInput("readAsync", path, returnAs);
      return read.async(resolvePath(path), returnAs);
    },

    remove: path => {
      remove.validateInput("remove", path);
      // If path not specified defaults to CWD
      remove.sync(resolvePath(path || "."));
    },
    removeAsync: path => {
      remove.validateInput("removeAsync", path);
      // If path not specified defaults to CWD
      return remove.async(resolvePath(path || "."));
    },

    rename: (path, newName, options) => {
      rename.validateInput("rename", path, newName, options);
      rename.sync(resolvePath(path), newName, options);
    },
    renameAsync: (path, newName, options) => {
      rename.validateInput("renameAsync", path, newName, options);
      return rename.async(resolvePath(path), newName, options);
    },

    symlink: (symlinkValue, path) => {
      symlink.validateInput("symlink", symlinkValue, path);
      symlink.sync(symlinkValue, resolvePath(path));
    },
    symlinkAsync: (symlinkValue, path) => {
      symlink.validateInput("symlinkAsync", symlinkValue, path);
      return symlink.async(symlinkValue, resolvePath(path));
    },

    tmpDir: options => {
      tmpDir.validateInput("tmpDir", options);
      const pathOfCreatedDirectory = tmpDir.sync(getCwdPath(), options);
      return cwd(pathOfCreatedDirectory);
    },
    tmpDirAsync: options => {
      tmpDir.validateInput("tmpDirAsync", options);
      return new Promise((resolve, reject) => {
        tmpDir.async(getCwdPath(), options).then(pathOfCreatedDirectory => {
          resolve(cwd(pathOfCreatedDirectory));
        }, reject);
      });
    },

    write: (path, data, options) => {
      write.validateInput("write", path, data, options);
      write.sync(resolvePath(path), data, options);
    },
    writeAsync: (path, data, options) => {
      write.validateInput("writeAsync", path, data, options);
      return write.async(resolvePath(path), data, options);
    }
  };

  if (util.inspect.custom !== undefined) {
    // Without this console.log(jetpack) throws obscure error. Details:
    // https://github.com/szwacz/fs-jetpack/issues/29
    // https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects
    api[util.inspect.custom] = () => {
      return `[fs-jetpack CWD: ${getCwdPath()}]`;
    };
  }

  return api;
};

module.exports = jetpackContext;


/***/ }),

/***/ 3796:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, path) => {
  const methodSignature = `${methodName}(path)`;
  validate.argument(methodSignature, "path", path, ["string", "undefined"]);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const listSync = path => {
  try {
    return fs.readdirSync(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Doesn't exist. Return undefined instead of throwing.
      return undefined;
    }
    throw err;
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const listAsync = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path)
      .then(list => {
        resolve(list);
      })
      .catch(err => {
        if (err.code === "ENOENT") {
          // Doesn't exist. Return undefined instead of throwing.
          resolve(undefined);
        } else {
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = listSync;
exports.async = listAsync;


/***/ }),

/***/ 685:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);
const copy = __nccwpck_require__(6592);
const dir = __nccwpck_require__(9665);
const exists = __nccwpck_require__(8091);
const remove = __nccwpck_require__(1584);

const validateInput = (methodName, from, to, options) => {
  const methodSignature = `${methodName}(from, to, [options])`;
  validate.argument(methodSignature, "from", from, ["string"]);
  validate.argument(methodSignature, "to", to, ["string"]);
  validate.options(methodSignature, "options", options, {
    overwrite: ["boolean"]
  });
};

const parseOptions = options => {
  const opts = options || {};
  return opts;
};

const generateDestinationExistsError = path => {
  const err = new Error(`Destination path already exists ${path}`);
  err.code = "EEXIST";
  return err;
};

const generateSourceDoesntExistError = path => {
  const err = new Error(`Path to move doesn't exist ${path}`);
  err.code = "ENOENT";
  return err;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const moveSync = (from, to, options) => {
  const opts = parseOptions(options);

  if (exists.sync(to) !== false && opts.overwrite !== true) {
    throw generateDestinationExistsError(to);
  }

  // We now have permission to overwrite, since either `opts.overwrite` is true
  // or the destination does not exist (in which overwriting is irrelevant).

  try {
    // If destination is a file, `fs.renameSync` will overwrite it.
    fs.renameSync(from, to);
  } catch (err) {
    if (err.code === "EISDIR" || err.code === "EPERM") {
      // Looks like the destination path is a directory in the same device,
      // so we can remove it and call `fs.renameSync` again.
      remove.sync(to);
      fs.renameSync(from, to);
    } else if (err.code === "EXDEV") {
      // The destination path is in another device.
      copy.sync(from, to, { overwrite: true });
      remove.sync(from);
    } else if (err.code === "ENOENT") {
      // This can be caused by either the source not existing or one or more folders
      // in the destination path not existing.
      if (!exists.sync(from)) {
        throw generateSourceDoesntExistError(from);
      }

      // One or more directories in the destination path don't exist.
      dir.createSync(pathUtil.dirname(to));
      // Retry the attempt
      fs.renameSync(from, to);
    } else {
      // We can't make sense of this error. Rethrow it.
      throw err;
    }
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const ensureDestinationPathExistsAsync = to => {
  return new Promise((resolve, reject) => {
    const destDir = pathUtil.dirname(to);
    exists
      .async(destDir)
      .then(dstExists => {
        if (!dstExists) {
          dir.createAsync(destDir).then(resolve, reject);
        } else {
          // Hah, no idea.
          reject();
        }
      })
      .catch(reject);
  });
};

const moveAsync = (from, to, options) => {
  const opts = parseOptions(options);

  return new Promise((resolve, reject) => {
    exists.async(to).then(destinationExists => {
      if (destinationExists !== false && opts.overwrite !== true) {
        reject(generateDestinationExistsError(to));
      } else {
        // We now have permission to overwrite, since either `opts.overwrite` is true
        // or the destination does not exist (in which overwriting is irrelevant).
        // If destination is a file, `fs.rename` will overwrite it.
        fs.rename(from, to)
          .then(resolve)
          .catch(err => {
            if (err.code === "EISDIR" || err.code === "EPERM") {
              // Looks like the destination path is a directory in the same device,
              // so we can remove it and call `fs.rename` again.
              remove
                .async(to)
                .then(() => fs.rename(from, to))
                .then(resolve, reject);
            } else if (err.code === "EXDEV") {
              // The destination path is in another device.
              copy
                .async(from, to, { overwrite: true })
                .then(() => remove.async(from))
                .then(resolve, reject);
            } else if (err.code === "ENOENT") {
              // This can be caused by either the source not existing or one or more folders
              // in the destination path not existing.
              exists
                .async(from)
                .then(srcExists => {
                  if (!srcExists) {
                    reject(generateSourceDoesntExistError(from));
                  } else {
                    // One or more directories in the destination path don't exist.
                    ensureDestinationPathExistsAsync(to)
                      .then(() => {
                        // Retry the attempt
                        return fs.rename(from, to);
                      })
                      .then(resolve, reject);
                  }
                })
                .catch(reject);
            } else {
              // Something unknown. Rethrow original error.
              reject(err);
            }
          });
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = moveSync;
exports.async = moveAsync;


/***/ }),

/***/ 3534:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);

const supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];

const validateInput = (methodName, path, returnAs) => {
  const methodSignature = `${methodName}(path, returnAs)`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.argument(methodSignature, "returnAs", returnAs, [
    "string",
    "undefined"
  ]);

  if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
    throw new Error(
      `Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(
        ", "
      )}`
    );
  }
};

// Matches strings generated by Date.toJSON()
// which is called to serialize date to JSON.
const jsonDateParser = (key, value) => {
  const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  if (typeof value === "string") {
    if (reISO.exec(value)) {
      return new Date(value);
    }
  }
  return value;
};

const makeNicerJsonParsingError = (path, err) => {
  const nicerError = new Error(
    `JSON parsing failed while reading ${path} [${err}]`
  );
  nicerError.originalError = err;
  return nicerError;
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const readSync = (path, returnAs) => {
  const retAs = returnAs || "utf8";
  let data;

  let encoding = "utf8";
  if (retAs === "buffer") {
    encoding = null;
  }

  try {
    data = fs.readFileSync(path, { encoding });
  } catch (err) {
    if (err.code === "ENOENT") {
      // If file doesn't exist return undefined instead of throwing.
      return undefined;
    }
    // Otherwise rethrow the error
    throw err;
  }

  try {
    if (retAs === "json") {
      data = JSON.parse(data);
    } else if (retAs === "jsonWithDates") {
      data = JSON.parse(data, jsonDateParser);
    }
  } catch (err) {
    throw makeNicerJsonParsingError(path, err);
  }

  return data;
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const readAsync = (path, returnAs) => {
  return new Promise((resolve, reject) => {
    const retAs = returnAs || "utf8";
    let encoding = "utf8";
    if (retAs === "buffer") {
      encoding = null;
    }

    fs.readFile(path, { encoding })
      .then(data => {
        // Make final parsing of the data before returning.
        try {
          if (retAs === "json") {
            resolve(JSON.parse(data));
          } else if (retAs === "jsonWithDates") {
            resolve(JSON.parse(data, jsonDateParser));
          } else {
            resolve(data);
          }
        } catch (err) {
          reject(makeNicerJsonParsingError(path, err));
        }
      })
      .catch(err => {
        if (err.code === "ENOENT") {
          // If file doesn't exist return undefined instead of throwing.
          resolve(undefined);
        } else {
          // Otherwise throw
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = readSync;
exports.async = readAsync;


/***/ }),

/***/ 1584:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const rimraf = __nccwpck_require__(7933);
const promisify = __nccwpck_require__(7976);
const promisifiedRimraf = promisify(rimraf);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, path) => {
  const methodSignature = `${methodName}([path])`;
  validate.argument(methodSignature, "path", path, ["string", "undefined"]);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const removeSync = path => {
  rimraf.sync(path, { disableGlob: true });
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const removeAsync = path => {
  return promisifiedRimraf(path, { disableGlob: true });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = removeSync;
exports.async = removeAsync;


/***/ }),

/***/ 3151:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const move = __nccwpck_require__(685);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, path, newName, options) => {
  const methodSignature = `${methodName}(path, newName, [options])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.argument(methodSignature, "newName", newName, ["string"]);
  validate.options(methodSignature, "options", options, {
    overwrite: ["boolean"]
  });

  if (pathUtil.basename(newName) !== newName) {
    throw new Error(
      `Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`
    );
  }
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const renameSync = (path, newName, options) => {
  const newPath = pathUtil.join(pathUtil.dirname(path), newName);
  move.sync(path, newPath, options);
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const renameAsync = (path, newName, options) => {
  const newPath = pathUtil.join(pathUtil.dirname(path), newName);
  return move.async(path, newPath, options);
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = renameSync;
exports.async = renameAsync;


/***/ }),

/***/ 4335:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(7147);

exports.createWriteStream = fs.createWriteStream;
exports.createReadStream = fs.createReadStream;


/***/ }),

/***/ 7618:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);
const dir = __nccwpck_require__(9665);

const validateInput = (methodName, symlinkValue, path) => {
  const methodSignature = `${methodName}(symlinkValue, path)`;
  validate.argument(methodSignature, "symlinkValue", symlinkValue, ["string"]);
  validate.argument(methodSignature, "path", path, ["string"]);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const symlinkSync = (symlinkValue, path) => {
  try {
    fs.symlinkSync(symlinkValue, path);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Parent directories don't exist. Just create them and retry.
      dir.createSync(pathUtil.dirname(path));
      fs.symlinkSync(symlinkValue, path);
    } else {
      throw err;
    }
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const symlinkAsync = (symlinkValue, path) => {
  return new Promise((resolve, reject) => {
    fs.symlink(symlinkValue, path)
      .then(resolve)
      .catch(err => {
        if (err.code === "ENOENT") {
          // Parent directories don't exist. Just create them and retry.
          dir
            .createAsync(pathUtil.dirname(path))
            .then(() => {
              return fs.symlink(symlinkValue, path);
            })
            .then(resolve, reject);
        } else {
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = symlinkSync;
exports.async = symlinkAsync;


/***/ }),

/***/ 5747:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const os = __nccwpck_require__(2037);
const crypto = __nccwpck_require__(6113);
const dir = __nccwpck_require__(9665);
const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);

const validateInput = (methodName, options) => {
  const methodSignature = `${methodName}([options])`;
  validate.options(methodSignature, "options", options, {
    prefix: ["string"],
    basePath: ["string"]
  });
};

const getOptionsDefaults = (passedOptions, cwdPath) => {
  passedOptions = passedOptions || {};
  const options = {};
  if (typeof passedOptions.prefix !== "string") {
    options.prefix = "";
  } else {
    options.prefix = passedOptions.prefix;
  }
  if (typeof passedOptions.basePath === "string") {
    options.basePath = pathUtil.resolve(cwdPath, passedOptions.basePath);
  } else {
    options.basePath = os.tmpdir();
  }
  return options;
};

const randomStringLength = 32;

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const tmpDirSync = (cwdPath, passedOptions) => {
  const options = getOptionsDefaults(passedOptions, cwdPath);
  const randomString = crypto
    .randomBytes(randomStringLength / 2)
    .toString("hex");
  const dirPath = pathUtil.join(
    options.basePath,
    options.prefix + randomString
  );
  // Let's assume everything will go well, do the directory fastest way possible
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    // Something went wrong, try to recover by using more sophisticated approach
    if (err.code === "ENOENT") {
      dir.sync(dirPath);
    } else {
      throw err;
    }
  }
  return dirPath;
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const tmpDirAsync = (cwdPath, passedOptions) => {
  return new Promise((resolve, reject) => {
    const options = getOptionsDefaults(passedOptions, cwdPath);
    crypto.randomBytes(randomStringLength / 2, (err, bytes) => {
      if (err) {
        reject(err);
      } else {
        const randomString = bytes.toString("hex");
        const dirPath = pathUtil.join(
          options.basePath,
          options.prefix + randomString
        );
        // Let's assume everything will go well, do the directory fastest way possible
        fs.mkdir(dirPath, err => {
          if (err) {
            // Something went wrong, try to recover by using more sophisticated approach
            if (err.code === "ENOENT") {
              dir.async(dirPath).then(() => {
                resolve(dirPath);
              }, reject);
            } else {
              reject(err);
            }
          } else {
            resolve(dirPath);
          }
        });
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = tmpDirSync;
exports.async = tmpDirAsync;


/***/ }),

/***/ 130:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Adater module exposing all `fs` methods with promises instead of callbacks.



const fs = __nccwpck_require__(7147);
const promisify = __nccwpck_require__(7976);

const isCallbackMethod = key => {
  return [
    typeof fs[key] === "function",
    !key.match(/Sync$/),
    !key.match(/^[A-Z]/),
    !key.match(/^create/),
    !key.match(/^(un)?watch/)
  ].every(Boolean);
};

const adaptMethod = name => {
  const original = fs[name];
  return promisify(original);
};

const adaptAllMethods = () => {
  const adapted = {};

  Object.keys(fs).forEach(key => {
    if (isCallbackMethod(key)) {
      if (key === "exists") {
        // fs.exists() does not follow standard
        // Node callback conventions, and has
        // no error object in the callback
        adapted.exists = () => {
          throw new Error("fs.exists() is deprecated");
        };
      } else {
        adapted[key] = adaptMethod(key);
      }
    } else {
      adapted[key] = fs[key];
    }
  });

  return adapted;
};

module.exports = adaptAllMethods();


/***/ }),

/***/ 3386:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const Minimatch = (__nccwpck_require__(3973).Minimatch);

const convertPatternToAbsolutePath = (basePath, pattern) => {
  // All patterns without slash are left as they are, if pattern contain
  // any slash we need to turn it into absolute path.
  const hasSlash = pattern.indexOf("/") !== -1;
  const isAbsolute = /^!?\//.test(pattern);
  const isNegated = /^!/.test(pattern);
  let separator;

  if (!isAbsolute && hasSlash) {
    // Throw out meaningful characters from the beginning ("!", "./").
    const patternWithoutFirstCharacters = pattern
      .replace(/^!/, "")
      .replace(/^\.\//, "");

    if (/\/$/.test(basePath)) {
      separator = "";
    } else {
      separator = "/";
    }

    if (isNegated) {
      return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
    }
    return `${basePath}${separator}${patternWithoutFirstCharacters}`;
  }

  return pattern;
};

exports.create = (basePath, patterns, ignoreCase) => {
  let normalizedPatterns;

  if (typeof patterns === "string") {
    normalizedPatterns = [patterns];
  } else {
    normalizedPatterns = patterns;
  }

  const matchers = normalizedPatterns
    .map(pattern => {
      return convertPatternToAbsolutePath(basePath, pattern);
    })
    .map(pattern => {
      return new Minimatch(pattern, {
        matchBase: true,
        nocomment: true,
        nocase: ignoreCase || false,
        dot: true
      });
    });

  const performMatch = absolutePath => {
    let mode = "matching";
    let weHaveMatch = false;
    let currentMatcher;
    let i;

    for (i = 0; i < matchers.length; i += 1) {
      currentMatcher = matchers[i];

      if (currentMatcher.negate) {
        mode = "negation";
        if (i === 0) {
          // There are only negated patterns in the set,
          // so make everything matching by default and
          // start to reject stuff.
          weHaveMatch = true;
        }
      }

      if (
        mode === "negation" &&
        weHaveMatch &&
        !currentMatcher.match(absolutePath)
      ) {
        // One negation match is enought to know we can reject this one.
        return false;
      }

      if (mode === "matching" && !weHaveMatch) {
        weHaveMatch = currentMatcher.match(absolutePath);
      }
    }

    return weHaveMatch;
  };

  return performMatch;
};


/***/ }),

/***/ 7386:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// Logic for unix file mode operations.



// Converts mode to string 3 characters long.
exports.normalizeFileMode = mode => {
  let modeAsString;
  if (typeof mode === "number") {
    modeAsString = mode.toString(8);
  } else {
    modeAsString = mode;
  }
  return modeAsString.substring(modeAsString.length - 3);
};


/***/ }),

/***/ 7976:
/***/ ((module) => {

"use strict";


module.exports = fn => {
  return function() {
    const length = arguments.length;
    const args = new Array(length);

    for (let i = 0; i < length; i += 1) {
      args[i] = arguments[i];
    }

    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

      fn.apply(null, args);
    });
  };
};


/***/ }),

/***/ 365:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(7147);
const pathUtil = __nccwpck_require__(1017);
const inspect = __nccwpck_require__(7628);
const list = __nccwpck_require__(3796);

const fileType = dirent => {
  if (dirent.isDirectory()) {
    return "dir";
  }
  if (dirent.isFile()) {
    return "file";
  }
  if (dirent.isSymbolicLink()) {
    return "symlink";
  }
  return "other";
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const initialWalkSync = (path, options, callback) => {
  if (options.maxLevelsDeep === undefined) {
    options.maxLevelsDeep = Infinity;
  }
  const performInspectOnEachNode = options.inspectOptions !== undefined;
  if (options.symlinks) {
    if (options.inspectOptions === undefined) {
      options.inspectOptions = { symlinks: options.symlinks };
    } else {
      options.inspectOptions.symlinks = options.symlinks;
    }
  }

  const walkSync = (path, currentLevel) => {
    fs.readdirSync(path, { withFileTypes: true }).forEach(direntItem => {
      const withFileTypesNotSupported = typeof direntItem === "string";

      let fileItemPath;
      if (withFileTypesNotSupported) {
        fileItemPath = pathUtil.join(path, direntItem);
      } else {
        fileItemPath = pathUtil.join(path, direntItem.name);
      }

      let fileItem;
      if (performInspectOnEachNode) {
        fileItem = inspect.sync(fileItemPath, options.inspectOptions);
      } else if (withFileTypesNotSupported) {
        // New "withFileTypes" API not supported, need to do extra inspect
        // on each node, to know if this is a directory or a file.
        const inspectObject = inspect.sync(
          fileItemPath,
          options.inspectOptions
        );
        fileItem = { name: inspectObject.name, type: inspectObject.type };
      } else {
        const type = fileType(direntItem);
        if (type === "symlink" && options.symlinks === "follow") {
          const symlinkPointsTo = fs.statSync(fileItemPath);
          fileItem = { name: direntItem.name, type: fileType(symlinkPointsTo) };
        } else {
          fileItem = { name: direntItem.name, type };
        }
      }

      if (fileItem !== undefined) {
        callback(fileItemPath, fileItem);
        if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
          walkSync(fileItemPath, currentLevel + 1);
        }
      }
    });
  };

  const item = inspect.sync(path, options.inspectOptions);
  if (item) {
    if (performInspectOnEachNode) {
      callback(path, item);
    } else {
      // Return simplified object, not full inspect object
      callback(path, { name: item.name, type: item.type });
    }
    if (item.type === "dir") {
      walkSync(path, 1);
    }
  } else {
    callback(path, undefined);
  }
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const maxConcurrentOperations = 5;

const initialWalkAsync = (path, options, callback, doneCallback) => {
  if (options.maxLevelsDeep === undefined) {
    options.maxLevelsDeep = Infinity;
  }
  const performInspectOnEachNode = options.inspectOptions !== undefined;
  if (options.symlinks) {
    if (options.inspectOptions === undefined) {
      options.inspectOptions = { symlinks: options.symlinks };
    } else {
      options.inspectOptions.symlinks = options.symlinks;
    }
  }

  const concurrentOperationsQueue = [];
  let nowDoingConcurrentOperations = 0;

  const checkConcurrentOperations = () => {
    if (
      concurrentOperationsQueue.length === 0 &&
      nowDoingConcurrentOperations === 0
    ) {
      doneCallback();
    } else if (
      concurrentOperationsQueue.length > 0 &&
      nowDoingConcurrentOperations < maxConcurrentOperations
    ) {
      const operation = concurrentOperationsQueue.pop();
      nowDoingConcurrentOperations += 1;
      operation();
    }
  };

  const whenConcurrencySlotAvailable = operation => {
    concurrentOperationsQueue.push(operation);
    checkConcurrentOperations();
  };

  const concurrentOperationDone = () => {
    nowDoingConcurrentOperations -= 1;
    checkConcurrentOperations();
  };

  const walkAsync = (path, currentLevel) => {
    const goDeeperIfDir = (fileItemPath, fileItem) => {
      if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
        walkAsync(fileItemPath, currentLevel + 1);
      }
    };

    whenConcurrencySlotAvailable(() => {
      fs.readdir(path, { withFileTypes: true }, (err, files) => {
        if (err) {
          doneCallback(err);
        } else {
          files.forEach(direntItem => {
            const withFileTypesNotSupported = typeof direntItem === "string";

            let fileItemPath;
            if (withFileTypesNotSupported) {
              fileItemPath = pathUtil.join(path, direntItem);
            } else {
              fileItemPath = pathUtil.join(path, direntItem.name);
            }

            if (performInspectOnEachNode || withFileTypesNotSupported) {
              whenConcurrencySlotAvailable(() => {
                inspect
                  .async(fileItemPath, options.inspectOptions)
                  .then(fileItem => {
                    if (fileItem !== undefined) {
                      if (performInspectOnEachNode) {
                        callback(fileItemPath, fileItem);
                      } else {
                        callback(fileItemPath, {
                          name: fileItem.name,
                          type: fileItem.type
                        });
                      }
                      goDeeperIfDir(fileItemPath, fileItem);
                    }
                    concurrentOperationDone();
                  })
                  .catch(err => {
                    doneCallback(err);
                  });
              });
            } else {
              const type = fileType(direntItem);
              if (type === "symlink" && options.symlinks === "follow") {
                whenConcurrencySlotAvailable(() => {
                  fs.stat(fileItemPath, (err, symlinkPointsTo) => {
                    if (err) {
                      doneCallback(err);
                    } else {
                      const fileItem = {
                        name: direntItem.name,
                        type: fileType(symlinkPointsTo)
                      };
                      callback(fileItemPath, fileItem);
                      goDeeperIfDir(fileItemPath, fileItem);
                      concurrentOperationDone();
                    }
                  });
                });
              } else {
                const fileItem = { name: direntItem.name, type };
                callback(fileItemPath, fileItem);
                goDeeperIfDir(fileItemPath, fileItem);
              }
            }
          });
          concurrentOperationDone();
        }
      });
    });
  };

  inspect
    .async(path, options.inspectOptions)
    .then(item => {
      if (item) {
        if (performInspectOnEachNode) {
          callback(path, item);
        } else {
          // Return simplified object, not full inspect object
          callback(path, { name: item.name, type: item.type });
        }
        if (item.type === "dir") {
          walkAsync(path, 1);
        } else {
          doneCallback();
        }
      } else {
        callback(path, undefined);
        doneCallback();
      }
    })
    .catch(err => {
      doneCallback(err);
    });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.sync = initialWalkSync;
exports.async = initialWalkAsync;


/***/ }),

/***/ 7006:
/***/ ((module) => {

"use strict";


const prettyPrintTypes = types => {
  const addArticle = str => {
    const vowels = ["a", "e", "i", "o", "u"];
    if (vowels.indexOf(str[0]) !== -1) {
      return `an ${str}`;
    }
    return `a ${str}`;
  };

  return types.map(addArticle).join(" or ");
};

const isArrayOfNotation = typeDefinition => {
  return /array of /.test(typeDefinition);
};

const extractTypeFromArrayOfNotation = typeDefinition => {
  // The notation is e.g. 'array of string'
  return typeDefinition.split(" of ")[1];
};

const isValidTypeDefinition = typeStr => {
  if (isArrayOfNotation(typeStr)) {
    return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
  }

  return [
    "string",
    "number",
    "boolean",
    "array",
    "object",
    "buffer",
    "null",
    "undefined",
    "function"
  ].some(validType => {
    return validType === typeStr;
  });
};

const detectType = value => {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (Buffer.isBuffer(value)) {
    return "buffer";
  }

  return typeof value;
};

const onlyUniqueValuesInArrayFilter = (value, index, self) => {
  return self.indexOf(value) === index;
};

const detectTypeDeep = value => {
  let type = detectType(value);
  let typesInArray;

  if (type === "array") {
    typesInArray = value
      .map(element => {
        return detectType(element);
      })
      .filter(onlyUniqueValuesInArrayFilter);
    type += ` of ${typesInArray.join(", ")}`;
  }

  return type;
};

const validateArray = (argumentValue, typeToCheck) => {
  const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);

  if (detectType(argumentValue) !== "array") {
    return false;
  }

  return argumentValue.every(element => {
    return detectType(element) === allowedTypeInArray;
  });
};

const validateArgument = (
  methodName,
  argumentName,
  argumentValue,
  argumentMustBe
) => {
  const isOneOfAllowedTypes = argumentMustBe.some(type => {
    if (!isValidTypeDefinition(type)) {
      throw new Error(`Unknown type "${type}"`);
    }

    if (isArrayOfNotation(type)) {
      return validateArray(argumentValue, type);
    }

    return type === detectType(argumentValue);
  });

  if (!isOneOfAllowedTypes) {
    throw new Error(
      `Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(
        argumentMustBe
      )}. Received ${detectTypeDeep(argumentValue)}`
    );
  }
};

const validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
  if (obj !== undefined) {
    validateArgument(methodName, optionsObjName, obj, ["object"]);
    Object.keys(obj).forEach(key => {
      const argName = `${optionsObjName}.${key}`;
      if (allowedOptions[key] !== undefined) {
        validateArgument(methodName, argName, obj[key], allowedOptions[key]);
      } else {
        throw new Error(
          `Unknown argument "${argName}" passed to ${methodName}`
        );
      }
    });
  }
};

module.exports = {
  argument: validateArgument,
  options: validateOptions
};


/***/ }),

/***/ 5234:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const pathUtil = __nccwpck_require__(1017);
const fs = __nccwpck_require__(130);
const validate = __nccwpck_require__(7006);
const dir = __nccwpck_require__(9665);

const validateInput = (methodName, path, data, options) => {
  const methodSignature = `${methodName}(path, data, [options])`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.argument(methodSignature, "data", data, [
    "string",
    "buffer",
    "object",
    "array"
  ]);
  validate.options(methodSignature, "options", options, {
    mode: ["string", "number"],
    atomic: ["boolean"],
    jsonIndent: ["number"]
  });
};

// Temporary file extensions used for atomic file overwriting.
const newExt = ".__new__";

const serializeToJsonMaybe = (data, jsonIndent) => {
  let indent = jsonIndent;
  if (typeof indent !== "number") {
    indent = 2;
  }

  if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) {
    return JSON.stringify(data, null, indent);
  }

  return data;
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const writeFileSync = (path, data, options) => {
  try {
    fs.writeFileSync(path, data, options);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Means parent directory doesn't exist, so create it and try again.
      dir.createSync(pathUtil.dirname(path));
      fs.writeFileSync(path, data, options);
    } else {
      throw err;
    }
  }
};

const writeAtomicSync = (path, data, options) => {
  // we are assuming there is file on given path, and we don't want
  // to touch it until we are sure our data has been saved correctly,
  // so write the data into temporary file...
  writeFileSync(path + newExt, data, options);
  // ...next rename temp file to replace real path.
  fs.renameSync(path + newExt, path);
};

const writeSync = (path, data, options) => {
  const opts = options || {};
  const processedData = serializeToJsonMaybe(data, opts.jsonIndent);

  let writeStrategy = writeFileSync;
  if (opts.atomic) {
    writeStrategy = writeAtomicSync;
  }
  writeStrategy(path, processedData, { mode: opts.mode });
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const writeFileAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options)
      .then(resolve)
      .catch(err => {
        // First attempt to write a file ended with error.
        // Check if this is not due to nonexistent parent directory.
        if (err.code === "ENOENT") {
          // Parent directory doesn't exist, so create it and try again.
          dir
            .createAsync(pathUtil.dirname(path))
            .then(() => {
              return fs.writeFile(path, data, options);
            })
            .then(resolve, reject);
        } else {
          // Nope, some other error, throw it.
          reject(err);
        }
      });
  });
};

const writeAtomicAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    // We are assuming there is file on given path, and we don't want
    // to touch it until we are sure our data has been saved correctly,
    // so write the data into temporary file...
    writeFileAsync(path + newExt, data, options)
      .then(() => {
        // ...next rename temp file to real path.
        return fs.rename(path + newExt, path);
      })
      .then(resolve, reject);
  });
};

const writeAsync = (path, data, options) => {
  const opts = options || {};
  const processedData = serializeToJsonMaybe(data, opts.jsonIndent);

  let writeStrategy = writeFileAsync;
  if (opts.atomic) {
    writeStrategy = writeAtomicAsync;
  }
  return writeStrategy(path, processedData, { mode: opts.mode });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = writeSync;
exports.async = writeAsync;


/***/ }),

/***/ 4610:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const jetpack = __nccwpck_require__(565);

module.exports = jetpack();


/***/ }),

/***/ 7933:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = rimraf
rimraf.sync = rimrafSync

var assert = __nccwpck_require__(9491)
var path = __nccwpck_require__(1017)
var fs = __nccwpck_require__(7147)
var glob = undefined
try {
  glob = __nccwpck_require__(1957)
} catch (_err) {
  // treat glob as optional.
}
var _0666 = parseInt('666', 8)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
var timeout = 0

var isWindows = (process.platform === "win32")

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function(m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  if (options.disableGlob !== true && glob === undefined) {
    throw Error('glob dependency not found, set `options.disableGlob = true` if intentional')
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, function (er, stat) {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  function afterGlob (er, results) {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            var time = busyTries * 100
            // try again, with the same exact callback as this one.
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, time)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      })
    })
  }
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, _0666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, options, er) {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, _0666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  try {
    var stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  var results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (var i = 0; i < results.length; i++) {
    var p = results[i]

    try {
      var st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options)
  })

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  var retries = isWindows ? 100 : 1
  var i = 0
  do {
    var threw = true
    try {
      var ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}


/***/ }),

/***/ 6863:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __nccwpck_require__(7147)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __nccwpck_require__(1734)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),

/***/ 1734:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __nccwpck_require__(1017);
var isWindows = process.platform === 'win32';
var fs = __nccwpck_require__(7147);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),

/***/ 7625:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var fs = __nccwpck_require__(7147)
var path = __nccwpck_require__(1017)
var minimatch = __nccwpck_require__(3973)
var isAbsolute = __nccwpck_require__(8714)
var Minimatch = minimatch.Minimatch

function alphasort (a, b) {
  return a.localeCompare(b, 'en')
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute
  self.fs = options.fs || fs

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),

/***/ 1957:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var rp = __nccwpck_require__(6863)
var minimatch = __nccwpck_require__(3973)
var Minimatch = minimatch.Minimatch
var inherits = __nccwpck_require__(4124)
var EE = (__nccwpck_require__(2361).EventEmitter)
var path = __nccwpck_require__(1017)
var assert = __nccwpck_require__(9491)
var isAbsolute = __nccwpck_require__(8714)
var globSync = __nccwpck_require__(9010)
var common = __nccwpck_require__(7625)
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __nccwpck_require__(2492)
var util = __nccwpck_require__(3837)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __nccwpck_require__(1223)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    self.fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  self.fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    self.fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return self.fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),

/***/ 9010:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = globSync
globSync.GlobSync = GlobSync

var rp = __nccwpck_require__(6863)
var minimatch = __nccwpck_require__(3973)
var Minimatch = minimatch.Minimatch
var Glob = (__nccwpck_require__(1957).Glob)
var util = __nccwpck_require__(3837)
var path = __nccwpck_require__(1017)
var assert = __nccwpck_require__(9491)
var isAbsolute = __nccwpck_require__(8714)
var common = __nccwpck_require__(7625)
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = this.fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, this.fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = this.fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = this.fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),

/***/ 5476:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const cache = new Map()
const fs = __nccwpck_require__(7147)
const { dirname, resolve } = __nccwpck_require__(1017)


const lstat = path => new Promise((res, rej) =>
  fs.lstat(path, (er, st) => er ? rej(er) : res(st)))

const inferOwner = path => {
  path = resolve(path)
  if (cache.has(path))
    return Promise.resolve(cache.get(path))

  const statThen = st => {
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  }
  const parent = dirname(path)
  const parentTrap = parent === path ? null : er => {
    return inferOwner(parent).then((owner) => {
      cache.set(path, owner)
      return owner
    })
  }
  return lstat(path).then(statThen, parentTrap)
}

const inferOwnerSync = path => {
  path = resolve(path)
  if (cache.has(path))
    return cache.get(path)

  const parent = dirname(path)

  // avoid obscuring call site by re-throwing
  // "catch" the error by returning from a finally,
  // only if we're not at the root, and the parent call works.
  let threw = true
  try {
    const st = fs.lstatSync(path)
    threw = false
    const { uid, gid } = st
    cache.set(path, { uid, gid })
    return { uid, gid }
  } finally {
    if (threw && parent !== path) {
      const owner = inferOwnerSync(parent)
      cache.set(path, owner)
      return owner // eslint-disable-line no-unsafe-finally
    }
  }
}

const inflight = new Map()
module.exports = path => {
  path = resolve(path)
  if (inflight.has(path))
    return Promise.resolve(inflight.get(path))
  const p = inferOwner(path).then(owner => {
    inflight.delete(path)
    return owner
  })
  inflight.set(path, p)
  return p
}
module.exports.sync = inferOwnerSync
module.exports.clearCache = () => {
  cache.clear()
  inflight.clear()
}


/***/ }),

/***/ 2492:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(2940)
var reqs = Object.create(null)
var once = __nccwpck_require__(1223)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),

/***/ 4124:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

try {
  var util = __nccwpck_require__(3837);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __nccwpck_require__(8544);
}


/***/ }),

/***/ 8544:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 3973:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = (function () { try { return __nccwpck_require__(1017) } catch (e) {}}()) || {
  sep: '/'
}
minimatch.sep = path.sep

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __nccwpck_require__(3717)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  b = b || {}
  var t = {}
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || typeof def !== 'object' || !Object.keys(def).length) {
    return minimatch
  }

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }
  m.Minimatch.defaults = function defaults (options) {
    return orig.defaults(ext(def, options)).Minimatch
  }

  m.filter = function filter (pattern, options) {
    return orig.filter(pattern, ext(def, options))
  }

  m.defaults = function defaults (options) {
    return orig.defaults(ext(def, options))
  }

  m.makeRe = function makeRe (pattern, options) {
    return orig.makeRe(pattern, ext(def, options))
  }

  m.braceExpand = function braceExpand (pattern, options) {
    return orig.braceExpand(pattern, ext(def, options))
  }

  m.match = function (list, pattern, options) {
    return orig.match(list, pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  assertValidPattern(pattern)

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  assertValidPattern(pattern)

  if (!options) options = {}

  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (!options.allowWindowsEscape && path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false
  this.partial = !!options.partial

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = function debug() { console.error.apply(console, arguments) }

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  assertValidPattern(pattern)

  // Thanks to Yeting Li <https://github.com/yetingli> for
  // improving this regexp to avoid a ReDOS vulnerability.
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

var MAX_PATTERN_LENGTH = 1024 * 64
var assertValidPattern = function (pattern) {
  if (typeof pattern !== 'string') {
    throw new TypeError('invalid pattern')
  }

  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError('pattern is too long')
  }
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  assertValidPattern(pattern)

  var options = this.options

  // shortcuts
  if (pattern === '**') {
    if (!options.noglobstar)
      return GLOBSTAR
    else
      pattern = '*'
  }
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      /* istanbul ignore next */
      case '/': {
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false
      }

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        // split where the last [ was, make sure we don't have
        // an invalid re. if so, re-walk the contents of the
        // would-be class to re-translate any characters that
        // were passed through as-is
        // TODO: It would probably be faster to determine this
        // without a try/catch and a new RegExp, but it's tricky
        // to do safely.  For now, this is safe and works.
        var cs = pattern.substring(classStart + 1, i)
        try {
          RegExp('[' + cs + ']')
        } catch (er) {
          // not a valid class!
          var sp = this.parse(cs, SUBPARSE)
          re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
          hasMagic = hasMagic || sp[1]
          inClass = false
          continue
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '[': case '.': case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) /* istanbul ignore next - should be impossible */ {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) /* istanbul ignore next - should be impossible */ {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = function match (f, partial) {
  if (typeof partial === 'undefined') partial = this.partial
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    /* istanbul ignore if */
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      /* istanbul ignore if */
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      hit = f === p
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else /* istanbul ignore else */ if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    return (fi === fl - 1) && (file[fi] === '')
  }

  // should be unreachable.
  /* istanbul ignore next */
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(2940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 8714:
/***/ ((module) => {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 2940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(3109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map